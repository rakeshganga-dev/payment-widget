import './App.css'
import PaymentWidget from './screens/PaymentWidget/PaymentWidget'


function App() {
  return (
    <>
      <PaymentWidget 
      expressCheckoutMethods={['googlepay','paypal', 'shoppay']}
      theme="Secondary"
      />
    </>
  )
}

export default App
