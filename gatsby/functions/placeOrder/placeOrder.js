const nodemailer = require('nodemailer');
// import nodemailer from 'nodemailer';

function generateOrderEmail({ order, total }) {
	return `<div>
		<h2>Your recent order for ${total}</h2>
		<p>We will have your order ready in the next 20 mins.</p>
		<ul>
			${order.map(
				item => `<li>
					<img src="${item.thumbnail}" alt="${item.name}">
					${item.size} ${item.name} - ${item.price}
				</li>`
			).join('')}
		</ul>
		<p>Your total is <strong>${total}</strong> due at pickup</p>
        <style>
            ul {list-style: none;}
        </style>
	</div>`;
}

// create a transport for nodemailer - using ethereal.email 
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function wait(ms = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
}

exports.handler = async (event, context) => {
    // await wait(5000);
	const body = JSON.parse(event.body);
    // console.log(body);

    // check if they have filled out the honeypot "spicySyrup"
    if(body.spicySyrup) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'B1234. Ruh Roh!!' }),
        };
    }

    // valdiate the data coming in
    const requiredFields = ['email', 'name', 'order'];

    for( const field of requiredFields ) {
        console.log(`checking if ${field} is good`);

		if(!body[field]) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: `oops! you are missing the ${field} field`,
				}),
			};
		}
    }

    // make sure items are in order
    if(!body.order.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Why would you order nothing?!`,
            }),
        };
    }

    // send the email
    const info = await transporter.sendMail({
        from: "Slick's Slices <slick@example.com>",
        to: `${body.name} <${body.email}>, orders@example.com`,
        subject: "New order!",
        html: generateOrderEmail({ order: body.order, total: body.total }),
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' }),

    };

    // send the success or error message



}