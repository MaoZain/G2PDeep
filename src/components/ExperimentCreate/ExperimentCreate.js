import React, { Component } from 'react'
import Style from './experimentCreate.module.css'
import { Select, Button, Input, message, Modal } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core'
import csvImg from './csv_file.png'
import arrowInput from './arrow-input.png'
import cnn from './cnn.png'
import cnn_yellow from './cnn_yellow.png'
import cnn_green from './cnn_green.png'
import dnn_layer from './dnn_layer.png'
import dnn_output from './dnn_output.png'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'
import YouTube from 'react-youtube'
import { ReactVideo } from 'reactjs-media';
import { Divider } from 'antd';



const { Option } = Select;
const { TextArea } = Input;
var videoE = null;


class ExperimentCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxLayerNum: 3,
            leftCnnLayerNum: 1,
            rightCnnLayerNum: 1,
            fCnnLayerNum: 1,
            leftCnn: [],
            rightCnn: [],
            fCn: [],
            description: '',
            experimentName: '',
            dataset: '',
            datasetInfo: [],
            learningRate: 0.00001,
            loading: false,
            isModalVisible:false,
        }
    }

    componentWillMount = () => {
        this.fetchDatasetInfo();
    }

    fetchDatasetInfo = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`/api/datasets/retrieve_dataset_info/?localstorage_id=${localStorage.getItem('G2PDeep')}`, requestOptions)
            .then(response => response.text())
            .then((result) => this.getDatasetInfo(result))
            .catch(error => console.log('error', error));
    }

    //set datasets_info as a global parameter 
    getDatasetInfo = (result) => {
        let datasetName = []
        let dataInfo = JSON.parse(result).message;
        // console.log(dataInfo)
        this.setState({
            datasetInfo: dataInfo,
        })
    }

    fetchToCreate = () => {
        //get data
        let epoch_num = 1000;
        let batch_num = 256;
        var left_filters_arr = new Array();
        var left_kernel_size_arr = new Array();
        var right_filters_arr = new Array();
        var right_kernel_size_arr = new Array();
        var fcn_size_arr = new Array();
        $("input[name='left_filters[]']").each(function () {
            left_filters_arr.push(parseInt($(this).val()));
        });
        $("input[name='left_kernel_size[]']").each(function () {
            left_kernel_size_arr.push(parseInt($(this).val()));
        });
        $("input[name='right_filters[]']").each(function () {
            right_filters_arr.push(parseInt($(this).val()));
        });
        $("input[name='right_kernel_size[]']").each(function () {
            right_kernel_size_arr.push(parseInt($(this).val()));
        });
        $("input[name='num_fcn[]']").each(function () {
            fcn_size_arr.push(parseInt($(this).val()));
        });
        $("input[name='epoch_num']").each(function () {
            epoch_num = parseInt($(this).val());
        });
        $("input[name='batch_num']").each(function () {
            batch_num = parseInt($(this).val());
        });
        // console.log("----");
        // console.log(left_filters_arr);
        // console.log(left_kernel_size_arr);
        // console.log(right_filters_arr);
        // console.log(right_kernel_size_arr);
        // console.log(fcn_size_arr);
        // console.log(epoch_num)
        // console.log("---------------------");
        //fetch to create
        if (left_filters_arr[left_filters_arr.length - 1] === right_filters_arr[right_filters_arr.length - 1]) {
            this.setState({
                loading: true
            });
            var myHeaders = new Headers();
            myHeaders.append("Access-Control-Allow-Origin", "*");
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(
                {
                    "localstorage_id": localStorage.getItem('G2PDeep'),
                    "experiment_name": this.state.experimentName,
                    "dataset_info_id": this.state.dataset,
                    "description": this.state.description,
                    "experimental_parameters":
                    {
                        "learning_rate": this.state.learningRate,
                        "epochs": epoch_num,
                        "batch_size": batch_num,
                    },
                    "model_hyperparameters":
                    {
                        "left_tower_filters_list": left_filters_arr,
                        "left_tower_kernel_size_list": left_kernel_size_arr,
                        "right_tower_filters_list": right_filters_arr,
                        "right_tower_kernel_size_list": right_kernel_size_arr,
                        "central_tower_filters_list": [10],
                        "central_tower_kernel_size_list": [4],
                        "dnn_size_list": fcn_size_arr,
                    }
                });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("/api/operation/conduct_experiment/", requestOptions)
                .then(response => response.text())
                .then(result => this.checkCreate(result))
                .catch(error => { message.warning('create fail'); console.log(error) });
        } else {
            message.warning('The number of filters in the last layers for both the left and right tower must be the same.')
        }
    }

    checkCreate = (result) => {
        let status = JSON.parse(result).status;
        console.log(status)
        if (status === 'SUCCESS' || status === 'RUNNING' || status === 'PEDNING') {
            this.props.fetchExperimentInfo();
            this.props.history.push("/experiment/summary");
        } else {
            message.warning(JSON.parse(result).message)
        }
        this.setState({ loading: false })
    }

    onChangeExperimentName = ({ target: { value } }) => {
        this.setState({
            experimentName: value
        })
    };

    onchageDataset = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            dataset: value,
        })
    }

    onchageLearningRate = (value) => {
        this.setState({
            learningRate: value,
        })
    }

    onChangeDescription = ({ target: { value } }) => {
        this.setState({
            description: value
        })
    };

    handleClose = () => {
        this.setState({
            isModalVisible: false
        })
    }

    playVedio = () => {
        this.setState({
            isModalVisible: true
        })
    }

    addLeftCnn = () => {
        if (this.state.leftCnnLayerNum < this.state.maxLayerNum) {
            let temp = [...this.state.leftCnn];
            temp.push(
                <div>
                    <img src={arrowInput} style={{ height: '20px', marginLeft: '340px', marginBottom: '10px' }}></img>
                    <div>
                        <Slider
                            name='left_filters[]'
                            style={{ color: '#1165f1', width: '100px' }}
                            defaultValue={5}
                            //   getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={3} max={12} step={1}
                            valueLabelDisplay="on"
                        />
                        <Slider
                            name='left_kernel_size[]'
                            style={{ color: 'rgba(239, 28, 65, 0.97)', width: '100px', marginLeft: '30px' }}
                            defaultValue={10}
                            //   getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={4} max={30} step={1}
                            valueLabelDisplay="on"
                        />
                        <img src={cnn_yellow} style={{ width: '150px', marginLeft: '50px', marginTop: '-20px' }}></img>
                    </div>
                </div>
            )
            this.setState({
                leftCnn: temp,
                leftCnnLayerNum: this.state.leftCnnLayerNum + 1,
            })
        }
    }

    addRightCnn = () => {
        if (this.state.rightCnnLayerNum < this.state.maxLayerNum) {
            let temp = [...this.state.rightCnn];
            temp.push(
                <div>
                    <img src={arrowInput} style={{ height: '20px', marginLeft: '60px', marginBottom: '10px' }}></img>
                    <div>
                        <img src={cnn_green} style={{ width: '150px', marginTop: '-20px' }}></img>
                        <Slider
                            name='right_filters[]'
                            style={{ color: '#1165f1', width: '100px', marginLeft: '45px' }}
                            defaultValue={5}
                            //   getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={3} max={12} step={1}
                            valueLabelDisplay="on"
                        />
                        <Slider
                            name='right_kernel_size[]'
                            style={{ color: 'rgba(239, 28, 65, 0.97)', width: '100px', marginLeft: '30px' }}
                            defaultValue={10}
                            //   getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={4} max={30} step={1}
                            valueLabelDisplay="on"
                        />
                    </div>
                </div>
            )
            this.setState({
                rightCnn: temp,
                rightCnnLayerNum: this.state.rightCnnLayerNum + 1
            })
        }
    }

    addFCnn = () => {
        if (this.state.fCnnLayerNum < this.state.maxLayerNum) {
            let temp = [...this.state.fCn];
            temp.push(
                <div>
                    <div style={{ paddingTop: '15px' }}>
                        <Slider
                            name='num_fcn[]'
                            style={{ color: '#1165f1', width: '250px' }}
                            defaultValue={256}
                            //   getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={1} max={512} step={1}
                            valueLabelDisplay="on"
                        />
                        <img src={dnn_layer} style={{ width: '200px', marginLeft: '100px' }}></img>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <img src={arrowInput} style={{ height: '32px', marginRight: '50px' }}></img>
                        <img src={arrowInput} style={{ height: '32px' }}></img>
                    </div>
                </div>
            )
            this.setState({
                fCn: temp,
                fCnnLayerNum: this.state.fCnnLayerNum + 1
            })
        }
    }

    delLeftCnn = () => {
        let temp = [...this.state.leftCnn];
        temp.pop();
        this.setState({
            leftCnn: temp,
            leftCnnLayerNum: this.state.leftCnnLayerNum - 1
        })
    }

    delRightCnn = () => {
        let temp = [...this.state.rightCnn];
        temp.pop();
        this.setState({
            rightCnn: temp,
            rightCnnLayerNum: this.state.rightCnnLayerNum - 1
        })
    }

    delFCn = () => {
        
        let temp = [...this.state.fCn];
        temp.pop();
        this.setState({
            fCn: temp,
            fCnnLayerNum: this.state.fCnnLayerNum - 1,
        })
    }

    create = () => {
        if (this.state.dataset != '' && this.state.experimentName != '') {
            this.fetchToCreate();

        } else {
            message.warning('Invalid Input')
        }
    }

    _onReady = (event) =>{
        videoE = event
    }

    render() {
        if(!this.state.isModalVisible){
            if(videoE !== null){
                videoE.target.pauseVideo()
            }
        }

        let instructions = (
            <div>
              <p>Instructions:</p>
              <ol>
                <li>Enter dataset name and choose dataset that you created.</li>
                <li>Please modify the training parameters and hyperparameters according to your data.</li>
                <li>A tutorial video is provided in<a className={Style.a_example} onClick={this.playVedio}>here</a>.</li>
              </ol>
              <p>NOTE: The default training parameters and hyperparameters are the best parameters for SoyNAM dataset.</p>
            </div>
          )

        // console.log(this.state.a)
        let experimentName = (
            <div id='experimentName'>
                <label className={Style.title}>Project Name<span style={{ color: 'red' }}>*</span> :</label>
                <br></br>
                <Input placeholder="input your dataset's name"
                    allowClear
                    onChange={this.onChangeExperimentName}
                    className={Style.inputDatasetName} />
            </div>
        )
        let dataset = (
            <div id='dataset' style={{ paddingTop: '30px' }}>
                <label className={Style.title}>Choose dataset<span style={{ color: 'red' }}>*</span> :</label>
                <br></br>
                <Select
                    className={Style.dataType}
                    showSearch
                    placeholder="Select a dataset"
                    optionFilterProp="children"
                    onChange={this.onchageDataset}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        this.state.datasetInfo.map((value) => {
                            return <Option value={value.dataset_info_id}>{value.dataset_name}</Option>
                        })
                    }
                </Select>
            </div>
        );
        let parameter = (
            <div style={{ width: '850px', paddingTop: '30px' }}>
                <label className={Style.title}>Training parameters :</label>
                <br></br>
                <label className={Style.title_small}>Epoch :</label>
                <Slider
                    name='epoch_num'
                    style={{ color: '#1165f1', width: '900px' }}
                    defaultValue={1000}
                    //   getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={200}
                    marks
                    min={200}
                    max={2001}
                    valueLabelDisplay="on"
                />
                <br></br>
                <label className={Style.title_small}>Batch size :</label>
                <Slider
                    name='batch_num'
                    style={{ color: 'rgba(239, 28, 65, 0.97)', width: '900px' }}
                    defaultValue={256}
                    //   getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={32}
                    marks
                    min={32}
                    max={513}
                    valueLabelDisplay="on"
                />
            </div>
        )
        let learningRate = (
            <div style={{ paddingTop: '30px' }}>
                <label className={Style.title}>Learning rate<span style={{ color: 'red' }}>*</span> :</label>
                <br></br>
                <Select
                    className={Style.dataType}
                    showSearch
                    defaultValue="0.00001"
                    optionFilterProp="children"
                    onChange={this.onchageLearningRate}
                >
                    <Option value={0.00001}>0.00001</Option>
                    <Option value={0.0001}>0.0001</Option>
                    <Option value={0.001}>0.001</Option>
                    <Option value={0.003}>0.003</Option>
                    <Option value={0.01}>0.01</Option>
                    <Option value={0.03}>0.03</Option>
                    <Option value={0.1}>0.1</Option>
                    <Option value={0.3}>0.3</Option>
                    <Option value={1}>1</Option>
                    <Option value={3}>3</Option>
                    <Option value={10}>10</Option>

                </Select>
            </div>
        )
        let early_stopping_patience = (
            <div style={{ paddingTop: '30px' }}>
                <label className={Style.title}>Early stopping patience<span style={{ color: 'red' }}>*</span> :</label>
                <br></br>
                <Select
                    className={Style.dataType}
                    showSearch
                    defaultValue="20"
                    optionFilterProp="children"
                >
                    <Option value={10}>10</Option>
                    <Option value={20}>20</Option>
                    <Option value={30}>30</Option>
                </Select>
            </div>
        )
        let modeling = (
            <div style={{ width: '900px', paddingTop: '30px' }}>
                <label className={Style.title}>Hyperparameters :</label>
                <Grid container >
                    {/* top layer */}
                    <Grid xs={12} style={{ backgroundColor: 'rgb(250, 234, 234, 0.4)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <img src={csvImg} style={{ width: '100px', marginLeft: '15px', marginTop: '' }}></img>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <img src={arrowInput} style={{ height: '32px', marginRight: '50px' }}></img>
                            <img src={arrowInput} style={{ height: '32px' }}></img>
                        </div>
                    </Grid>
                    {/* sencond layer left */}
                    <Grid name='leftCNN' xs={6} style={{ backgroundColor: 'rgba(255, 255, 208, 0.4)', padding: '5px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Typography variant="subtitle1">Left Tower (CNN)</Typography>
                        </div>
                        <div>
                            <span>Add/Delete layer (min:1, max:3)</span>
                            <Button type='primary' size='small'
                                style={{ marginLeft: '40px', backgroundColor: '#1165f1' }}
                                onClick={this.addLeftCnn}
                            >Add Layer</Button>
                            <Button type='primary' size='small'
                                style={{ marginLeft: '10px', backgroundColor: '#1165f1' }}
                                onClick={this.delLeftCnn}
                            >Del Layer</Button>
                        </div>
                        <div>
                            <br></br>
                            <pre>filters         kernel size</pre>
                        </div>
                        <div style={{ paddingTop: '15px' }}>
                            <Slider
                                name='left_filters[]'
                                style={{ color: '#1165f1', width: '100px' }}
                                defaultValue={10}
                                //   getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                min={3} max={12} step={1}
                                valueLabelDisplay="on"
                            />
                            <Slider
                                name='left_kernel_size[]'
                                style={{ color: 'rgba(239, 28, 65, 0.97)', width: '100px', marginLeft: '30px' }}
                                defaultValue={4}
                                //   getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                min={4} max={30} step={1}
                                valueLabelDisplay="on"
                            />
                            <img src={cnn_yellow} style={{ width: '150px', marginLeft: '50px', marginTop: '-20px' }}></img>
                        </div>
                        {
                            this.state.leftCnn.map(element => {
                                return element;
                            })
                        }
                    </Grid>
                    {/* second layer right */}
                    <Grid xs={6} style={{ backgroundColor: 'rgba(227, 252, 228, 0.4)', padding: '5px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Typography variant="subtitle1">Right Tower (CNN)</Typography>
                        </div>
                        <div>
                            <span>Add/Delete layer (min:1, max:3)</span>
                            <Button type='primary' size='small'
                                style={{ marginLeft: '40px', backgroundColor: '#1165f1' }}
                                onClick={this.addRightCnn}
                            >Add Layer</Button>
                            <Button type='primary' size='small'
                                style={{ marginLeft: '10px', backgroundColor: '#1165f1' }}
                                onClick={this.delRightCnn}
                            >Del Layer</Button>
                        </div>
                        <div>
                            <br></br>
                            <pre>                       filters         kernel size</pre>
                        </div>
                        <div style={{ paddingTop: '15px' }}>
                            <img src={cnn_green} style={{ width: '150px', marginTop: '-20px' }}></img>
                            <Slider
                                name='right_filters[]'
                                style={{ color: '#1165f1', width: '100px', marginLeft: '45px' }}
                                defaultValue={10}
                                aria-labelledby="discrete-slider-small-steps"
                                min={3} max={12} step={1}
                                valueLabelDisplay="on"
                            />
                            <Slider
                                name='right_kernel_size[]'
                                style={{ color: 'rgba(239, 28, 65, 0.97)', width: '100px', marginLeft: '30px' }}
                                defaultValue={4}
                                //   getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                min={4} max={30} step={1}
                                valueLabelDisplay="on"
                            />
                        </div>
                        {
                            this.state.rightCnn.map(element => {
                                return element;
                            })
                        }
                    </Grid>
                    {/* last layer */}
                    <Grid xs={12} style={{ backgroundColor: 'rgb(229, 226, 250, 0.4)', padding: '5px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <img src={arrowInput} style={{ height: '32px', marginRight: '50px' }}></img>
                            <img src={arrowInput} style={{ height: '32px' }}></img>
                        </div>
                        <div style={{ paddingBottom: '20px' }}>
                            <span style={{ marginLeft: '100px' }}>Size</span>
                            <span variant="subtitle1" style={{ marginLeft: '200px' }}>Fully connected neural network</span>
                            <Button type='primary' size='small'
                                style={{ marginLeft: '110px', backgroundColor: '#1165f1' }}
                                onClick={this.addFCnn}
                            >Add Layer</Button>
                            <Button type='primary' size='small'
                                style={{ marginLeft: '10px', backgroundColor: '#1165f1' }}
                                onClick={this.delFCn}
                            >Del Layer</Button>
                        </div>
                        {
                            this.state.fCn.map(element => {
                                return element;
                            })
                        }
                        <div>
                            <Slider
                                name='num_fcn[]'
                                style={{ color: '#1165f1', width: '250px' }}
                                defaultValue={1}
                                value={1}
                                aria-labelledby="discrete-slider-small-steps"
                                min={1} max={512} step={1}
                                valueLabelDisplay="on"
                            />
                            <img src={dnn_output} style={{ width: '22px', marginLeft: '180px' }}></img>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );

        let Description = (
            <div style={{ paddingTop: '30px' }}>
                <div className={Style.title}>
                    <label >Description :</label>
                </div>
                <TextArea
                    className={Style.description}
                    onChange={this.onChangeDescription}
                    placeholder="Iinput your data"
                    autoSize={{ minRows: 3 }}
                />
            </div>
        )

      
        let video = (
                <div style = {{width:"100%"}}>
                    <YouTube videoId="qlWYL3e2hBU"
                        opts = {
                            {width:"100%"}
                        }
                        onReady={this._onReady}
                    
                    >
                    </YouTube>
                </div>
            )
        

        return (
            <div>
                <h2>Creating project</h2>
                {instructions}
                 <Divider />

                <Modal title="vesdio model name" 
                    footer = {null} 
                    visible={this.state.isModalVisible} 
                    onCancel={this.handleClose}
                    width="50%"
                >
                    {video}
                </Modal>

                <div style={{paddingTop:'40px'}}>
                    {experimentName}
                    <br></br>
                    {dataset}
                    <br></br>
                    {learningRate}
                    <br></br>
                    {early_stopping_patience}
                    <br></br>
                    {Description}
                    <br></br>
                    {parameter}
                    <br></br>
                    {modeling}
                    <Button type="primary" size='large'
                        style={{ marginTop: '30px' }}
                        loading={this.state.loading}
                        onClick={this.create}>Create</Button>
                </div>

            </div>
        )
    }
}

export default withRouter(ExperimentCreate)
