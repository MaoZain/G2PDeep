import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Space } from 'antd';
import Style from './footer.module.css'
const { Content } = Layout;
const { Title, Text, Link } = Typography;

export default class Footer extends Component {
  render() {
    return (
      <foot className={Style.footer}  >
        <Row>
          <Col span={4}></Col>
          <Col span={8} style={{ textAlign: 'left' }}>
            <Title level={5}>Publication:</Title>
            <p>
              Liu, Y., Wang, D., He, F., Wang, J., Joshi, T., & Xu, D. (2019).
              Phenotype prediction and genome-wide association study using deep convolutional neural network of soybean. Frontiers in Genetics, 10, 1091.
            </p>
          </Col>
          <Col span={4} style={{ textAlign: 'left' }}>
            <Title level={5}>Alliance & Collaboration</Title>
            <Space direction="vertical">
              <Text><Link href='https://kbcommons.org/' target='_blank'>KBCommons</Link></Text>
              <Text><Link href='http://digbio.missouri.edu/' target='_blank'>Contact us</Link></Text>
            </Space>
          </Col>
          <Col span={4}></Col>
        </Row>
        <Row>
          <Col span={4}></Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              <img alt="Creative Commons License"  src="https://i.creativecommons.org/l/by/4.0/80x15.png" />
            </a>
              This work is licensed under a 
              <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"> Creative Commons Attribution 4.0 International License
            </a>.
          </Col>
        </Row>
      </foot>
    )
  }
}
