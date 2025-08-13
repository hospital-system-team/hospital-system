import React from 'react'
import { ThreeDots }  from 'react-loader-spinner'


export default function Loader() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
          <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#155dfc"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
    </>
  )
}
