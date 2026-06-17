function Alerts() {
  return (
<div className="space-y-4">

  <div className="bg-red-600 p-4 rounded-xl">
    ⚠ High Traffic at Central Square
  </div>

  <div className="bg-yellow-600 p-4 rounded-xl">
    ⚠ AQI Above Safe Limit
  </div>

  <div className="bg-red-600 p-4 rounded-xl">
    ⚠ Waste Bin Full
  </div>

</div>
  );
}

export default Alerts;