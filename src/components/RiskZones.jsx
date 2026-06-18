function RiskZones() {

  const zones = [
    {
      zone: "Assi Ghat",
      risk: 92,
    },
    {
      zone: "Orderly Bazar",
      risk: 84,
    },
    {
      zone: "Lanka",
      risk: 76,
    },
    {
      zone: "Godowlia",
      risk: 53,
    },
    {
      zone: "Varanasi Central",
      risk: 31,
    },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        🏆 Highest Risk Areas
      </h2>

      <div className="space-y-4">

        {zones.map(
          (item, index) => (

            <div
              key={index}
              className="
              flex
              justify-between
              items-center
              bg-slate-700
              p-4
              rounded-xl
              "
            >

              <div>
                #{index + 1} {item.zone}
              </div>

              <div
                className={`
                  font-bold
                  ${
                    item.risk > 80
                      ? "text-red-400"
                      : item.risk > 60
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                `}
              >
                {item.risk}
              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default RiskZones;