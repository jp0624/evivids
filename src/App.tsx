import eLogo from '/logos/evivids-white.svg'
import './App.scss'

function App() {
	return (
		<>
			<div className='site-container'>
				<section className='section-main'>
					<ul>
						<li>
							<img src={eLogo} className='logo' alt='Vite logo' />
						</li>
						<li>
							<form className='form-getintouch'>
								<h2>Get in touch</h2>
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
