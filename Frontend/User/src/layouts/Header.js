import React, { Component } from "react";
import { Link } from "react-router-dom"; // Ensure you use this if you plan to use <Link> in your header
import logo from "../assets/images/logo.png"

class Header extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <header class="section-header">
<nav class="navbar p-md-0 navbar-expand-sm navbar-light border-bottom">
<div class="container">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTop4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTop4">
    <ul class="navbar-nav mr-auto">
    	<li class="nav-item dropdown">
		 	<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">   Language </a>
		    <ul class="dropdown-menu small">
				<li><a class="dropdown-item" href="#">English</a></li>
				<li><a class="dropdown-item" href="#">Arabic</a></li>
				<li><a class="dropdown-item" href="#">Russian </a></li>
		    </ul>
		</li>
		<li class="nav-item dropdown">
			<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown"> USD </a>
			<ul class="dropdown-menu small">
				<li><a class="dropdown-item" href="#">EUR</a></li>
				<li><a class="dropdown-item" href="#">AED</a></li>
				<li><a class="dropdown-item" href="#">RUBL </a></li>
		    </ul>
		</li>
    </ul>
    <ul class="navbar-nav">
		<li><a href="#" class="nav-link"> <i class="fa fa-comment"></i> Live chat </a></li>
		<li><a href="#" class="nav-link"> <i class="fa fa-phone"></i> Call us </a></li>
	</ul> 
  </div> 
</div> 
</nav>

<section class="header-main border-bottom">
	<div class="container">
<div class="row row-sm align-items-center">
	<div class="col-lg-2 col-md-3 col-6">
		<a href="http://bootstrap-ecommerce.com" class="brand-wrap">
			<img className="logo" src={logo} alt="Logo"/>
		</a> 
	</div>
	<div class="col-lg col-sm col-md col-6 flex-grow-0">
		<div class="category-wrap dropdown d-inline-block float-md-right">
			<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"> 
				<i class="fa fa-bars"></i> All category 
			</button>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Machinery / Mechanical Parts / Tools </a>
				<a class="dropdown-item" href="#">Consumer Electronics / Home Appliances </a>
				<a class="dropdown-item" href="#">Auto / Transportation</a>
				<a class="dropdown-item" href="#">Apparel / Textiles / Timepieces </a>
				<a class="dropdown-item" href="#">Home & Garden / Construction / Lights </a>
				<a class="dropdown-item" href="#">Beauty & Personal Care / Health </a> 
			</div>
		</div>  
	</div> 
	<div class="col-lg  col-md-6 col-sm-12 col">
		<form action="#" class="search-header">
			<div class="input-group w-100">
			    <input type="text" class="form-control" style={{"width":"60%"}} placeholder="Search"/>
			    <select class="custom-select border-left"  name="category_name">
						<option value="">All type</option><option value="codex">Special</option>
						<option value="comments">Only best</option>
						<option value="content">Latest</option>
				</select>
			    <div class="input-group-append">
			      <button class="btn btn-primary" type="submit">
			        <i class="fa fa-search"></i>
			      </button>
			    </div>
		    </div>
		</form> 
	</div>
	<div class="col-lg-3 col-sm-12 col-md-12 col-12">
		<div class="widgets-wrap float-md-right">
			<a href="#" class="widget-header mr-2">
				<i class="icon icon-sm rounded-circle border fa fa-shopping-cart"></i>
				<span class="notify">2</span>
			</a>
			<a href="#" class="widget-header mr-2">
				 <i class="icon icon-sm rounded-circle border fa fa-heart"></i>
			</a>
			<div class="widget-header dropdown">
				<a href="#" data-toggle="dropdown" data-offset="20,10">
					<div class="icontext">
						<div class="icon">
							<i class="icon-sm rounded-circle border fa fa-user"></i>
						</div>
						<div class="text">
							<small class="text-muted">Sign in | Join</small>
							<div>My account <i class="fa fa-caret-down"></i> </div>
						</div>
					</div>
				</a>
				<div class="dropdown-menu dropdown-menu-right">
					<form class="px-4 py-3">
						<div class="form-group">
						  <label>Email address</label>
						  <input type="email" class="form-control" placeholder="email@example.com"/>
						</div>
						<div class="form-group">
						  <label>Password</label>
						  <input type="password" class="form-control" placeholder="Password"/>
						</div>
						<button type="submit" class="btn btn-primary">Sign in</button>
						</form>
						<hr class="dropdown-divider"/>
						<a class="dropdown-item" href="#">Have account? Sign up</a>
						<a class="dropdown-item" href="#">Forgot password?</a>
				</div> 
			</div>  
		</div> 
	</div> 
</div> 
	</div> 
</section>


<nav class="navbar navbar-main navbar-expand-lg border-bottom">
  <div class="container">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav4" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="main_nav4">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link pl-0" href="#"> <strong>All category</strong></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Fashion</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Supermarket</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Electronics</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Baby &amp Toys</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Fitness sport</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Foods and Drink</a>
            <a class="dropdown-item" href="#">Home interior</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Category 1</a>
            <a class="dropdown-item" href="#">Category 2</a>
            <a class="dropdown-item" href="#">Category 3</a>
          </div>
        </li>
      </ul>
    </div> 
  </div>
</nav>

</header>
    );
  }
}

export default Header;
