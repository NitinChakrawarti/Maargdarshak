
// components/AnalyticsCard.jsx
const AnalyticsCard = ({ icon: Icon, emoji, count, label, extraInfo, gradient, iconColor }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl">{emoji}</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-1">{count}</h3>
    <p className="text-gray-600 text-sm">{label}</p>
    {extraInfo && <div className="mt-3 flex items-center text-sm text-green-600">{extraInfo}</div>}
  </div>
);

export default AnalyticsCard;
