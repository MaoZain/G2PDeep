import React, { Component } from 'react'
import Style from "./header.module.css";
import logo from './favicon.ico'

export default class Header extends Component {
    render() {
        return (
            <header id='header' className={Style.headerContainer}>
                <div className={Style.row}>
                    <div className={Style.symbol}>
                        <h1>
                            <a href='###' className={Style.logo}>
                                <img alt="logo" src={logo}/>
                                Geno-Pheno-type Predictor
                            </a>
                        </h1>
                    </div>
                </div>
            </header>
        )
    }
}
