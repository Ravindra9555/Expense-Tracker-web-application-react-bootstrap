import React from 'react'
import img1  from "../../assets/img/13.svg"
import img2  from "../../assets/img/14.svg"
import img3  from "../../assets/img/6.svg"
const Carousel = () => {
  return (
    <div>
 <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="3000">
      <img src={img2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="3000">
      <img src={img1} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img3} className="d-block w-100" alt="..." data-bs-interval="3000"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Carousel
