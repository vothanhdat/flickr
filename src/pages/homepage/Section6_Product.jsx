import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Hidden from 'material-ui/Hidden'
import ButtonBase from 'material-ui/ButtonBase'
import Grid from 'material-ui/Grid'

@withTranslate
@withSCSS('../common.scss', './Section6_Product.scss')
class Section6_Product extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='products'>
      <div className={classes.container}>
        <h2>{_(T.main_products)}</h2>
        <div className={classes.prods}>
          <ButtonBase component='a' rel="noopener" target="_blank" href="http://up.live" className={classes.platf}>
            <img src="/images/uplivepf/uplive.png" className={classes.img} alt={_(T.main_product_1)} />
            <div className={classes.title}>{_(T.main_product_1)}</div>
          </ButtonBase>
          <ButtonBase component='a' rel="noopener" target="_blank" href="http://m.upliveapps.com/ugift/gift.html" className={classes.platf}>
            <img src="/images/uplivepf/universal.png" className={classes.img} alt={_(T.main_product_2)} />
            <div className={classes.title}>{_(T.main_product_2)} </div>
          </ButtonBase>
          <ButtonBase component='a' rel="noopener" target="_blank" href="http://up.live/#/home" className={classes.platf}>
            <img src="/images/uplivepf/wallet.png" className={classes.img} alt={_(T.main_product_3)} />
            <div className={classes.title}>{_(T.main_product_3)}</div>
          </ButtonBase>
          <ButtonBase component='a' rel="noopener" target="_blank" href="https://valentine.gifto.io" className={classes.platf}>
            <img src="/images/uplivepf/valentine.png" className={classes.img} alt={_(T.main_product_4)} />
            <div className={classes.title}>{_(T.main_product_4)} </div>
          </ButtonBase>
          <ButtonBase component='a' rel="noopener" target="_blank" href="http://foreverrose.io" className={classes.platf}>
            <img src="/images/uplivepf/rose.png" className={classes.img} alt={_(T.main_product_5)} />
            <div className={classes.title}>{_(T.main_product_5)}</div>
          </ButtonBase>
          <ButtonBase component='a' rel="noopener" target="_blank" href="https://web.telegram.org/#/im?p=@FWP_Bot" className={classes.platf}>
            <img src="/images/uplivepf/game.png" className={classes.img} alt={_(T.main_product_6)} />
            <div className={classes.title}>{_(T.main_product_6)}</div>
          </ButtonBase>
        </div>

      </div>
    </div>
  }
}



export default Section6_Product

