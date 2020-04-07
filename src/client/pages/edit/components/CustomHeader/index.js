import React from 'react'
import { Layout, Button } from 'antd'
import { EyeOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import axios from 'axios'

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
  position: 'relative',
  zIndex: 2,
  backgroundColor: '#fff',
  boxShadow: '0 1px 7px rgba(0, 0, 0, 0.06)' 
}


function CustomHeader() {

  const pageList = useSelector(state => state.pageListReducer)

  const publish = () => {
    console.log(pageList)


    axios.post('http://localhost:9090/server/publish', {
      pageList,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

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
              onClick={publish}
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
