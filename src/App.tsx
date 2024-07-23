import eLogo from '/logos/evivids-white.svg'
import './App.scss'

import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

function App() {
	useEffect(() => emailjs.init('YOUR-PUBLIC-KEY-HERE'), [])
	const emailRef = useRef<HTMLInputElement>()
	const firstNameRef = useRef<HTMLInputElement>()
	const lastNameRef = useRef<HTMLInputElement>()
	const [loading, setLoading] = useState(false)

	const [messageSent, setMessageSent] = useState(false)

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		console.log('attempting to send email')
		const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
		const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
		try {
			setLoading(true)
			await emailjs.send(
				serviceId,
				templateId,
				{
					first_name: firstNameRef.current!.value,
					last_name: lastNameRef.current!.value,
					recipient: emailRef.current!.value,
				},
				{
					publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				}
			)
			setMessageSent(true)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
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
							<form className='form-getintouch' onSubmit={handleSubmit}>
								{messageSent ? (
									<>
										<h2>Thank you!</h2>
										<p>We will be in touch shortly</p>
									</>
								) : (
									<>
										<h2>Get in touch</h2>
										<label htmlFor='first-name'>First Name</label>
										<input
											ref={(ref) =>
												(firstNameRef.current = ref as HTMLInputElement)
											}
											type='text'
											name='first-name'
											id='first-name'
											required
										/>
										<label htmlFor='last-name'>Last Name</label>
										<input
											ref={(ref) =>
												(lastNameRef.current = ref as HTMLInputElement)
											}
											type='text'
											name='last-name'
											id='last-name'
										/>
										<label htmlFor='email'>Email</label>
										<input
											ref={(ref) =>
												(emailRef.current = ref as HTMLInputElement)
											}
											type='email'
											name='email'
											id='email'
											required
										/>
										<button
											type='submit'
											className={loading ? 'loading' : ''}
											disabled={loading}
										>
											Submit
										</button>
									</>
								)}
							</form>
						</li>
					</ul>
				</section>
			</div>
		</>
	)
}

export default App
