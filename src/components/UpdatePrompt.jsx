import { useRegisterSW } from 'virtual:pwa-register/react'

function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) {
    return null
  }

  return (
    <div className="update-prompt">
      <span>A new version is available</span>
      <button className="button button-primary" onClick={() => updateServiceWorker(true)}>
        Update
      </button>
    </div>
  )
}

export default UpdatePrompt
