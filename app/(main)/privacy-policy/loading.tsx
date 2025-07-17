const PrivacyPolicyLoading = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-12 bg-gray-200 rounded-md animate-pulse mb-8"></div>
          <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-8 w-1/4"></div>

          {[...Array(8)].map((_, i) => (
            <div key={i} className="mb-10">
              <div className="h-8 bg-gray-200 rounded-md animate-pulse mb-6 w-3/4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyLoading
