import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe("pk_test_51RkdDp4Fe5gArWIn1fXUQ7k31ov09E2P3YwT5WYD0x3p05LlTIr1yADWsri2ICJJnKqxtQ2SBCaHNqIrnO320Zdj004gBQDhgs");

createRoot(document.getElementById('root')).render(

  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>

)
