import React, { Component } from 'react'
import Style from './footer.module.css'

export default class Footer extends Component {
    render() {
        return (
            <foot className={Style.footer} >
                <p>Liu, Y., Wang, D., He, F., Wang, J., Joshi, T., & Xu, D. (2019).</p>
                <p>Phenotype prediction and genome-wide association study using deep convolutional neural network of soybean. Frontiers in Genetics, 10, 1091.</p>
            </foot>
        )
    }
}
