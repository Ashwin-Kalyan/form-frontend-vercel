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
              送信完了 / Registration Complete
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
                  ありがとうございます！ / Thank you!!
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
              {/* Japanese Section */}
              <div className="mb-4">
                <p className="mb-3">
                  本日のブース訪問、ありがとうございます。貴方のご回答、確かに拝見しました。担当者より改めてご連絡いたします。
                </p>
                <p className="mb-3">
                  私たちは日本で、決して止まってはいけない社会インフラを支える通信技術に取り組んでいます。
                </p>
                <p className="mb-3">
                  日本で学び、経験を積み、将来その力をタイで活かしたい方との出会いを楽しみにしています。
                </p>
              </div>
              
              <hr className="my-4" style={{ borderColor: '#e0e0e0' }} />
              
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
                    <br />
                    <span style={{ color: '#888888' }}>敬具</span>
                  </p>
                  <img 
                    src="/logo.png" 
                    alt="Kyowa Technologies Logo" 
                    style={{ 
                      height: 'auto',
                      width: 'auto',
                      maxHeight: '100px',
                      maxWidth: '200px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      console.error('Logo failed to load');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <p className="mb-1">
                  <strong>Gentaro Sogo</strong>
                  <br />
                  <span style={{ color: '#888888' }}>相合源太郎</span>
                </p>
                <p className="mb-1">
                  <strong>CEO Kyowa Technologies Co., Ltd.</strong>
                  <br />
                  <span style={{ color: '#888888' }}>代表取締役社長 協和テクノロジーズ株式会社</span>
                </p>
                <p className="mb-0 small text-muted">
                  <span style={{ whiteSpace: 'nowrap' }}>Continued contact: r-hirata@star.kyotec.co.jp</span>
                  <br />
                  <span style={{ color: '#888888' }}>連絡先: r-hirata@star.kyotec.co.jp</span>
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
              閉じる / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
