import React from 'react'
import withSCSS from 'withsass.macro';



export default class HLSPLayer extends React.Component {
  static defaultProps = {
    classes: {}
  }
  
  Hls = null;
  hls = null;
  async componentDidMount() {
    var Hls = this.Hls = await import('hls.js')
      .then(e => e.default)

    var hls = this.hls = new Hls();
    var video = this.video

    if (Hls.isSupported()) {
      hls.loadSource(this.props.src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.props.src;
      video.addEventListener('canplay', function () {
        video.play();
      });
    }

  }

  async componentDidUpdate({ src }) {
    await import('hls.js');
    if (this.props.src != src) {
      if (this.Hls.isSupported()) {
        this.hls.loadSource(this.props.src);
        this.hls.attachMedia(this.video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.video.play();
        });
      } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
        this.video.src = this.props.src;
        this.video.addEventListener('canplay', () => {
          this.video.play();
        });
      }
    }
  }
  initVideo() {

  }
  ref = (e) => this.video = e

  render() {
    const { classes, poster = '' } = this.props
    return <video ref={this.ref} className={classes.video} style={{ backgroundImage: `url(${poster})` }}>

    </video>
  }
}