import React, { useRef, useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

function Banner({ bannerList, height }) {

  const banner = useRef(null)

  useEffect(() => {
    new Swiper(banner.current, {
      loop: true,
      autoplay: {
        delay: 3000
      },
      navigation: false,
      on: {
        click: (e) => {
          const url = e.target.getAttribute('data-redirect')
          if (e) {
            window.location.href = url
          }
        }
      }
    })
  }, [])

  return (
    <div ref={banner} style={{ overflow: 'hidden', height: height ? `${height}px` : '150px' }}>
      <div className="swiper-wrapper" >
        {bannerList.map((item, index) => (
          <div key={index} className="swiper-slide">
            <div
              style={{
                height: `${height}px` || '150px',
                background: `url(${item.imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              data-redirect={item.to}
            >

            </div>
          </div>
        ))}
      </div>
      <div className='swiper-pagination'></div>
    </div>
  )
}

export default Banner