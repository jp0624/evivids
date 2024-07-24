import eLogo from '/logos/evivids-white.svg'
import './App.scss'

import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

function App() {
	useEffect(() => emailjs.init('YOUR-PUBLIC-KEY-HERE'), [])
	const emailRef = useRef<HTMLInputElement>()
	const firstNameRef = useRef<HTMLInputElement>()
	const lastNameRef = useRef<HTMLInputElement>()
	const messageRef = useRef<HTMLTextAreaElement>()

	const [loading, setLoading] = useState(false)
	const [sendError, setSendError] = useState(false)

	const [messageSent, setMessageSent] = useState(false)
	const [formPage, setFormPageChage] = useState(1)
	const formPages = 2

	// const checkRequired = (page) => {
	// 	return true
	// }
	// const showErrors = (page) => {
	// 	return false
	// }
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		console.log('formPage: ', formPage)
		if (formPage < formPages) {
			// const gotoNext = checkRequired(formPage)

			// if(gotoNext) {
			// 	return setFormPageChage(formPage + 1)
			// } else {
			// 	return showErrors(formPage)
			// }
			return setFormPageChage(formPage + 1)
		}
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
					your_message: messageRef.current!.value,
				},
				{
					publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				}
			)
			setMessageSent(true)
		} catch (error) {
			setSendError(true)
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
								{messageSent || sendError ? (
									<>
										{messageSent ? (
											<>
												<h2>Thank you!</h2>
												<p>We will be in touch shortly</p>
											</>
										) : (
											<>
												<h2>Error sending message</h2>
												<p>Something went wrong</p>
											</>
										)}
									</>
								) : (
									<>
										<h2>Get in touch</h2>
										<div className={`form-pages showPage-${formPage}`}>
											<div
												className={`page page-${
													formPage === 1 ? 'show' : 'hide'
												}`}
												id='page-1'
											>
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
													required
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
											</div>
											<div
												className={`page page-${
													formPage === 2 ? 'show' : 'hide'
												}`}
												id='page-2'
											>
												<label htmlFor='your-message'>Your Message</label>
												<textarea
													ref={(ref) =>
														(messageRef.current = ref as HTMLTextAreaElement)
													}
													name='your-message'
													id='your-message'
													required
												></textarea>
											</div>
										</div>
										<div className={'btn-container'}>
											{formPage > 1 && (
												<button onClick={() => setFormPageChage(formPage - 1)}>
													Back
												</button>
											)}
											{formPage === formPages ? (
												<button
													type='submit'
													className={loading ? 'loading' : ''}
													disabled={loading}
												>
													Submit
												</button>
											) : (
												<button onClick={handleSubmit}>Next</button>
											)}
										</div>
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
