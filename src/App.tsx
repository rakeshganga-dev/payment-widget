import './App.css'
import PaymentWidget from './screens/PaymentWidget/PaymentWidget'


function App() {
  return (
    <>
      <PaymentWidget 
      isExpressCheckout={true} 
      expressCheckoutMethods={['googlepay','paypal', 'shoppay']}
      theme="Secondary"
      />
    </>
  )
}

export default App
