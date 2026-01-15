interface SuccessModalProps {
  onClose: () => void
  data: {
    fullName: string
    email: string
    [key: string]: any
  }
}

const SuccessModal = ({ onClose, data: _data }: SuccessModalProps) => {
  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
      tabIndex={-1}
    >
      <div 
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title w-100 text-center">
              Registration Complete
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Email Message Header */}
            <div className="mb-3" style={{ 
              borderBottom: '2px solid #00B7CE', 
              paddingBottom: '0.75rem' 
            }}>
              <div className="d-flex align-items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ color: '#00B7CE' }}
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
                <strong style={{ color: '#333333', fontSize: '1rem' }}>
                  Thank you!!
                </strong>
              </div>
            </div>

            {/* Email Message Content */}
            <div style={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '1.5rem',
              lineHeight: '1.8'
            }}>
              {/* English Section */}
              <div>
                <p className="mb-3">
                  <strong>Dear All,</strong>
                </p>
                <p className="mb-3">
                  Thanks for visiting our booth today! we'll be in touch soon!
                </p>
                <p className="mb-3">
                  Our mission is engineering the critical communication technologies that keep essential infrastructure running in Japan.
                </p>
                <p className="mb-4">
                  Join us in Japan and grow with us! We guide you and we learn together!
                </p>
              </div>
              
              <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e0e0e0' }}>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <p className="mb-0">
                    <strong>Yours sincerely,</strong>
                  </p>
                  <img 
                    src="/logo5.png" 
                    alt="Kyowa Technologies Logo" 
                    style={{ 
                      height: 'auto',
                      width: 'auto',
                      maxHeight: '85px',
                      maxWidth: '170px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      console.error('Logo failed to load');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <p className="mb-1">
                  <strong>Sogou Gentaro</strong>
                </p>
                <p className="mb-1">
                  <strong>CEO Kyowa Technologies Co., Ltd.</strong>
                </p>
                <p className="mb-0 small text-muted">
                  <span style={{ whiteSpace: 'nowrap' }}>Contact: thai_recruit@star.kytoec.co.jp</span>
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
