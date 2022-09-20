import React from "react";

import {
Box,
Container,
Row,
Column,

FooterLink,
Heading,
} from "./FooterStyle";

const Footer = () => {
	
return (
	<Box>
	
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Aim</FooterLink>
            {/* <a onClick={() => {window.location.href="/signup"}}>Aim</a>
            <a onClick={() => {window.location.href="/signup"}}>Vision</a>
            <a onClick={() => {window.location.href="/signup"}}>Testimonials</a> */}
			<FooterLink href="#">Vision</FooterLink>
			{/* <FooterLink href="/signup">Testimonials</FooterLink> */}
		</Column>
		<Column>
			<Heading>Services</Heading>
			<FooterLink href="/">Home</FooterLink>
			<FooterLink href="/register">Registration</FooterLink>
			<FooterLink href="/signup">Login</FooterLink>
			<FooterLink href="/premium">Premium</FooterLink>
			<FooterLink href="/change_password">Change Password</FooterLink>
			<FooterLink href="/forget_password">Forget Password</FooterLink>
			
			
			
            {/* <a onClick={() => {window.location.href="/signup"}}>Login</a>
            <a onClick={() => {window.location.href="/register"}}>Registration</a>
            <a onClick={() => {window.location.href="/premium"}}>Premium</a>
            <a onClick={() => {window.location.href="/"}}>Home</a> */}
		</Column>
        <Column>
			<Heading>Vehicles</Heading>
			{/* <FooterLink href="#">Pick-Up </FooterLink> */}
			<a href='/vehicle/Pick-Up' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}> Pick-Up </a>
			<br/>
			<a href='/vehicle/Mini-Truck' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}> Mini-Truck </a><br/>
			<a href='/vehicle/Truck' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}>Truck </a><br/>
			<a href='/vehicle/Car-Taxi' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}> Car-Taxi </a><br/>
			<a href='/vehicle/Auto' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}> Auto </a><br/>
			<a href='/vehicle/Tractor' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}>Tractor </a><br/>
			<a href='/vehicle/Jcb-Crane' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}> Jcb-Crane </a><br/>
			<a href='/vehicle/Travels Mini-Travels' style={{fontSize:'17px',textDecoration: 'none',color:'black'}}> Travels Mini-Travels </a><br/>
			{/* <FooterLink href="#">Mini-Truck</FooterLink>
			<FooterLink href="#">Truck</FooterLink>
			<FooterLink href="#">Car-Taxi</FooterLink>
            <FooterLink href="#">Auto</FooterLink>
            <FooterLink href="#">Tractor</FooterLink>
            <FooterLink href="#">Jcb-Crane</FooterLink>
            <FooterLink href="#">Travels Mini-Travels</FooterLink> */}
           
		</Column>
		<Column>
			<Heading>Contact Us</Heading>
			<FooterLink href="#">Contact </FooterLink>
			{/* <FooterLink href="#">Ahemdabad</FooterLink>
			<FooterLink href="#">Indore</FooterLink>
			<FooterLink href="#">Mumbai</FooterLink> */}
            {/* <a onClick={() => {window.location.href="/signup"}}>Pradesh</a>
            <a onClick={() => {window.location.href="/signup"}}>Ahemdabad</a>
            <a onClick={() => {window.location.href="/signup"}}>Indore</a>
            <a onClick={() => {window.location.href="/signup"}}>Mumbai</a> */}
		</Column>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>

    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)',textAlign:'center' }}>
        © 2022 Copyright:
        <a className='text-reset fw-bold' href='https://DestinationMart.com/'>
          DestinationMart.com
        </a>
      </div>
	</Box>
);
};
export default Footer;
