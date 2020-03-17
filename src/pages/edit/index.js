import React, { Component } from 'react'
import { Layout, Menu } from 'antd'

const { Header } = Layout

function Edit() {

  return (
    <div>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    </div>
  )

}

export default Edit
