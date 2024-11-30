import React, { Component } from "react";
import { Link } from "react-router-dom"; // Ensure you use this if you plan to use <Link> in your header
import logo from "../assets/images/logo.png"
import appstore from "../assets/images/misc/appstore.png"
import playmarket from "../assets/images/misc/playmarket.png"

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="section-footer">
	<div class="container">
		<section class="footer-top padding-y">
			<div class="row">
				<aside class="col-md-4">
					<article class="mr-3">
						<img src={logo}  className="logo-footer"/>
						<p class="mt-3">Some short text about company like You might remember the Dell computer commercials in which a youth reports this exciting news to his friends.</p>
						<div>
						    <a class="btn btn-icon btn-light" title="Facebook" target="_blank" href="#"><i class="fab fa-facebook-f"></i></a>
						    <a class="btn btn-icon btn-light" title="Instagram" target="_blank" href="#"><i class="fab fa-instagram"></i></a>
						    <a class="btn btn-icon btn-light" title="Youtube" target="_blank" href="#"><i class="fab fa-youtube"></i></a>
						    <a class="btn btn-icon btn-light" title="Twitter" target="_blank" href="#"><i class="fab fa-twitter"></i></a>
						</div>
					</article>
				</aside>
				<aside class="col-sm-3 col-md-2">
					<h6 class="title">About</h6>
					<ul class="list-unstyled">
						<li> <a href="#">About us</a></li>
						<li> <a href="#">Services</a></li>
						<li> <a href="#">Rules and terms</a></li>
						<li> <a href="#">Blogs</a></li>
					</ul>
				</aside>
				<aside class="col-sm-3 col-md-2">
					<h6 class="title">Services</h6>
					<ul class="list-unstyled">
						<li> <a href="#">Help center</a></li>
						<li> <a href="#">Money refund</a></li>
						<li> <a href="#">Terms and Policy</a></li>
						<li> <a href="#">Open dispute</a></li>
					</ul>
				</aside>
				<aside class="col-sm-3  col-md-2">
					<h6 class="title">For users</h6>
					<ul class="list-unstyled">
						<li> <a href="#"> User Login </a></li>
						<li> <a href="#"> User register </a></li>
						<li> <a href="#"> Account Setting </a></li>
						<li> <a href="#"> My Orders </a></li>
						<li> <a href="#"> My Wishlist </a></li>
					</ul>
				</aside>
				<aside class="col-sm-2  col-md-2">
					<h6 class="title">Our app</h6>
					<a href="#" class="d-block mb-2"><img src={appstore} height="40"/></a>
					<a href="#"  class="d-block mb-2"><img src={playmarket} height="40"/></a>
				</aside>
			</div> 
		</section>	

		<section class="footer-copyright border-top">
				<p class="float-left text-muted"> &copy 2019 Company  All rights resetved </p>
				<p target="_blank" class="float-right text-muted">
					<a href="#">Privacy & Cookies</a>
				</p>
		</section>
	</div>
</footer>
    );
  }
}

export default Footer;
