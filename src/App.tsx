import eLogo from '/logos/evivids-white.svg'
import './App.scss'
import emailjs from '@emailjs/browser'
import { useRef } from 'react'

function App() {
	const form = useRef()

	const sendEmail = (e) => {
		e.preventDefault()
		// service_id, templte_id and public key will get from Emailjs website when you create account and add template service and email service
		emailjs
			.sendForm(
				'YOUR_SERVICE_ID',
				'YOUR_TEMPLATE_ID',
				form.current,
				'YOUR_PUBLIC_KEY'
			)
			.then(
				(result) => {
					console.log(result.text)
				},
				(error) => {
					console.log(error.text)
				}
			)
	}

	return (
		<>
			<div className='site-container'>
				<section className='section-main'>
					<ul>
						<li>
							<img src={eLogo} className='logo' alt='Vite logo' />
						</li>
						<li>
							<form className='form-getintouch' ref={form} onSubmit={sendEmail}>
								<h2>Get in touch</h2>
								<pre>
									import.meta.env.VITE_API_KEY:
									{import.meta.env.VITE_API_KEY}
								</pre>
								<label htmlFor='first-name'>First Name</label>
								<input type='text' name='first-name' id='first-name' required />
								<label htmlFor='last-name'>Last Name</label>
								<input type='text' name='last-name' id='last-name' required />
								<label htmlFor='email'>Email</label>
								<input type='email' name='email' id='email' required />
								<button type='submit'>Submit</button>
							</form>
						</li>
					</ul>
				</section>
			</div>
		</>
	)
}

export default App
