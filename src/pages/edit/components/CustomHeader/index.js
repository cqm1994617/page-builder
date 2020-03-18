import React from 'react'
import { Layout, Button } from 'antd'
import { EyeOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import styled from 'styled-components'

const { Header } = Layout

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`
const ButtonGroup = styled.div`
  margin-left: ${props => props.marginLeft || '10px'};
`

const headerStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 1px 7px rgba(0, 0, 0, 0.06)'
}


function CustomHeader() {

  return (
    <Header style={headerStyle}>
      <HeaderContainer>
        <div>测试主页</div>
        <div>
          <ButtonGroup>
            <Button
              type="link"
              icon={<EyeOutlined />}
            >
              预览
              </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              type="link"
              icon={<SaveOutlined />}
            >
              保存
              </Button>
          </ButtonGroup>
          <ButtonGroup marginLeft="30px">
            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
            >
              发布
              </Button>
          </ButtonGroup>
        </div>
      </HeaderContainer>
    </Header>
  )

}

export default CustomHeader
