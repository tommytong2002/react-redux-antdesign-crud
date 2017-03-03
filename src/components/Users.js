import React from "react"
import { Form, Input, InputNumber, Button, Radio, Table } from 'antd'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'


import { connect } from "react-redux"
import { fetchUser, createUser, updateUser, deleteUser } from "../actions/userActions"

const FormItem = Form.Item;

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched
  };
})

export default class Users extends React.Component {
  constructor() {
    super();

    //const expandedRowRender = record => <p>{record.name}</p>;
    const title = () => 'CRUD of React + Redux + Ant-design';
    const showHeader = true;
    const footer = () => 'Here is footer';
    //const scroll = { y: 240 };
    this.state = {
      formLayout: 'inline',
      currentId: null,
      editing: false,
      newUser: {
        name: "",
        age: 0,
      },
      tableConfig: {
        bordered: true,
        loading: true,
        pagination: false,
        size: 'small',
        //expandedRowRender,
        title,
        showHeader,
        footer,
        //rowSelection: {},
        scroll: undefined,
      }

    };
    
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }

  componentWillMount() {
    this.props.dispatch(fetchUser())
    this.setState({ tableConfig: { loading: false } })
  }

  changeName(e) {
    this.setState({newUser:{name:e.target.value, age: this.state.newUser.age}})
  }

  changeAge(e) {
    this.setState({newUser:{name:this.state.newUser.name, age:e}})
  }

  saveNewUser(){
    this.setState({ tableConfig: { loading: true} })
    this.props.dispatch(createUser(this.state.newUser))
    this.setState({ editing: false, newUser: { name: "", age: 0 } })
    this.setState({ tableConfig: { loading: false} })
  }

  updateUser(){
    this.props.dispatch(updateUser({id: this.state.currentId, data: this.state.newUser}))
    this.setState({ editing: false, newUser: { name: "", age: 0 } })
  }

  handleUpdateUser(e){
    console.log(e)
    this.setState({ currentId: e.id, editing: true, newUser:{name:e.name,age:e.age} })
  }

  handleDeleteUser(e){
    console.log(this.props)
    //var removedItem = fruits.splice(pos, 1);
    this.props.dispatch(deleteUser(e.id))

  }

  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    const layoutProps = { [formLayout]: true };

    const { user } = this.props;
    const data = user;

    let button = null
    if(this.state.editing){
      button = <Button type="default" size="large" onClick={this.updateUser.bind(this)}>Save Changes</Button>
    }else{
      button = <Button type="primary" size="large" onClick={this.saveNewUser.bind(this)}>Create User</Button>
    }

    const columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={()=>this.handleUpdateUser(record)}>Edit</a>
          <span className="ant-divider" />
          <a onClick={()=>this.handleDeleteUser(record)}>Delete</a>
        </span>
      ),
    }];

    return (
      <div>
        <Form {...layoutProps}>
          <FormItem
            label="Form Layout"
            {...formItemLayout}
          >
            <Radio.Group defaultValue="inline" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem
            label="Username"
            {...formItemLayout}
          >
            <Input type="text" value={this.state.newUser.name} placeholder="Name" onChange={this.changeName.bind(this)}/>
          </FormItem>
          <FormItem
            label="Age"
            {...formItemLayout}
          >
            <InputNumber min={1} max={99} value={this.state.newUser.age} onChange={this.changeAge.bind(this)} />
        
          </FormItem>
          <FormItem {...buttonItemLayout}>
            {button}
          </FormItem>
        </Form>
        <Table rowKey={record => record.id}  {...this.state.tableConfig} columns={columns} dataSource={data} />
      </div>
    )
  }
}

