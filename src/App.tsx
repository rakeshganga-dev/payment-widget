import './App.css'
import PaymentWidget from './screens/PaymentWidget/PaymentWidget'


function App() {
  return (
    <>
      <PaymentWidget 
      expressCheckoutMethods={['googlepay','paypal', 'shoppay']}
      theme="Primary"
      />
    </>
  )
}

export default App
