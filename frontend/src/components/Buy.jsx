import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const handlePurchase=()=>{
console.log("Purchase initiated for course ID:", courseId);
  }

  return (
    <div >
<button onClick={handlePurchase} disabled={loading}>{loading?"Processing..":"Buy Now"}</button>
    </div>

  )
}
export default Buy;