import { useState, FormEvent } from 'react'

interface FormData {
  firstName: string
  lastName: string
  gender: string
  faculty: string
  facultyOther: string
  desiredPosition: string
  desiredYear: string
  age: string
  email: string
  emailConfirm: string
  interests: string[]
  comments: string
  privacyConsent: boolean
}

interface RegistrationFormProps {
  onSubmit: (data: any) => void
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    gender: '',
    faculty: '',
    facultyOther: '',
    desiredPosition: '',
    desiredYear: '',
    age: '',
    email: '',
    emailConfirm: '',
    interests: [],
    comments: '',
    privacyConsent: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false)

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const currentInterests = prev.interests || []
      if (currentInterests.includes(interest)) {
        return { ...prev, interests: currentInterests.filter(i => i !== interest) }
      } else {
        return { ...prev, interests: [...currentInterests, interest] }
      }
    })
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required / 名は必須です'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required / 姓は必須です'
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required / 性別は必須です'
    }
    if (!formData.faculty && !formData.facultyOther.trim()) {
      newErrors.faculty = 'Faculty is required / 学部は必須です'
    }
    if (!formData.desiredPosition) {
      newErrors.desiredPosition = 'Desired position is required / 希望職種は必須です'
    }
    if (!formData.desiredYear) {
      newErrors.desiredYear = 'Desired year to work is required / 就職希望年度は必須です'
    }
    // Email is optional, but if provided, validate format
    if (formData.email.trim()) {
      // Validate email format: name@example.com
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address / 有効なメールアドレスを入力してください'
      }
      // If email is provided, confirmation is required
      if (!formData.emailConfirm.trim()) {
        newErrors.emailConfirm = 'Email confirmation is required / メールアドレス確認は必須です'
      } else if (formData.email !== formData.emailConfirm) {
        newErrors.emailConfirm = 'Emails do not match / メールアドレスが一致しません'
      }
    } else if (formData.emailConfirm.trim()) {
      // If confirmation is provided but email is not, show error
      newErrors.emailConfirm = 'Please enter email address first / まずメールアドレスを入力してください'
    }
    if (!formData.interests || formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest / 少なくとも1つ選択してください'
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Privacy policy consent is required / プライバシーポリシーへの同意が必要です'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const submissionData = {
          fullName: `${formData.firstName} ${formData.lastName}`,
          gender: formData.gender,
          faculty: formData.faculty === 'other' ? formData.facultyOther : formData.faculty,
          desiredPosition: formData.desiredPosition,
          desiredYear: formData.desiredYear,
          age: formData.age,
          email: formData.email,
          interests: formData.interests,
          comments: formData.comments,
        }
        await onSubmit(submissionData)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const facultyOptions = [
    'IT / Information Technology / IT/情報技術学部',
    'Digital Technology / デジタルテクノロジー学部',
    'Business Administration / 経営学部',
    'Global Communication / グローバルコミュニケーション学部',
    'TNIC / International College / TNIC/国際学院',
    'Continued Education / Adult Education / 社会人教育',
    'MA / Master\'s Course / MA/修士課程',
    'Graduated / 既卒',
    'Other / その他',
  ]

  const handlePrivacyChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, privacyConsent: checked }))
    if (errors.privacyConsent) {
      setErrors(prev => ({ ...prev, privacyConsent: undefined }))
    }
  }

  return (
    <div>
      {/* Logo at Top Center */}
      <div className="text-center mb-3" style={{ padding: '0 0.5rem' }}>
        <img 
          src="/logo.png" 
          alt="Kyowa Technologies Logo" 
          style={{ 
            height: 'clamp(3.5rem, 8vw, 6.5rem)',
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'inline-block',
            margin: '0 auto'
          }}
          onError={(e) => {
            console.error('Logo failed to load');
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Company Name */}
      <div className="text-center mb-3" style={{ padding: '0 0.5rem', overflow: 'hidden' }}>
        <h1 className="fw-bold mb-2" style={{ 
          fontSize: 'clamp(0.875rem, 5vw, 3.5rem)', 
          color: '#00B7CE', 
          margin: 0, 
          whiteSpace: 'nowrap',
          lineHeight: '1.2',
          overflow: 'hidden'
        }}>
          Kyowa Technologies Co., Ltd.
        </h1>
      </div>

      {/* Main Message */}
      <h2 className="text-center mb-3 mb-md-4 fw-bold" style={{ 
        fontSize: 'clamp(0.875rem, 4vw, 2.75rem)', 
        color: '#333333', 
        lineHeight: '1.3',
        padding: '0 0.5rem',
        overflow: 'hidden'
      }}>
        <span style={{ whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%', overflow: 'hidden' }}>Connect with us!!!</span><br />
        <span style={{ whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%', overflow: 'hidden' }}>For Internships and Employment</span><br />
        <span style={{ whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%', overflow: 'hidden' }}>and MORE!!!</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center mb-4 mb-md-5" style={{ 
        color: '#333333', 
        fontSize: 'clamp(0.875rem, 2.5vw, 1.75rem)', 
        fontWeight: '600',
        padding: '0 0.5rem',
        lineHeight: '1.4',
        overflow: 'hidden'
      }}>
        <span style={{ whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%', overflow: 'hidden' }}>Work with us in Japan!!! We will contact you!!!</span><br />
        <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 1rem)', color: '#666666', fontWeight: '400', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%', overflow: 'hidden' }}>日本で一緒に働きましょう！ご連絡させていただきます！</span>
      </p>

      <form onSubmit={handleSubmit}>
        {/* Full Name - Two fields vertically on mobile */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Full Name / 氏名 <span className="text-danger">*</span>
          </label>
          <div className="d-flex flex-column gap-2">
            <div>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                placeholder="First Name / 名"
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                placeholder="Last Name / 姓"
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Gender / 性別 <span className="text-danger">*</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
            style={{ fontSize: '0.9rem' }}
          >
            <option value="">Please Select / 選択してください</option>
            <option value="male">Male / 男性</option>
            <option value="female">Female / 女性</option>
            <option value="other">Other / その他</option>
            <option value="prefer_not_to_say">Prefer not to say / 回答しない</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
        </div>

        {/* Faculty - Dropdown with "If Other" field */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Faculty / 学部 <span className="text-danger">*</span>
          </label>
          <select
            value={formData.faculty}
            onChange={(e) => handleChange('faculty', e.target.value)}
            className={`form-select mb-2 ${errors.faculty ? 'is-invalid' : ''}`}
            style={{ fontSize: '0.9rem' }}
          >
            <option value="">Please Select / 選択してください</option>
            {facultyOptions.map((faculty, index) => (
              <option key={index} value={faculty === 'Other / その他' ? 'other' : faculty}>
                {faculty}
              </option>
            ))}
          </select>
          {formData.faculty === 'other' && (
            <input
              type="text"
              value={formData.facultyOther}
              onChange={(e) => handleChange('facultyOther', e.target.value)}
              className="form-control"
              placeholder="If Other - Please Specify / その他の場合 - ご指定ください"
            />
          )}
          {errors.faculty && (
            <div className="invalid-feedback d-block">{errors.faculty}</div>
          )}
        </div>

        {/* Desired Position */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Desired Position / 希望職種 <span className="text-danger">*</span>
          </label>
          <select
            value={formData.desiredPosition}
            onChange={(e) => handleChange('desiredPosition', e.target.value)}
            className={`form-select ${errors.desiredPosition ? 'is-invalid' : ''}`}
            style={{ fontSize: '0.9rem' }}
          >
            <option value="">Please Select / 選択してください</option>
            <option value="Field Engineer">Field Engineer</option>
            <option value="Software Engineer AI Related">Software Engineer AI Related</option>
          </select>
          {errors.desiredPosition && (
            <div className="invalid-feedback">{errors.desiredPosition}</div>
          )}
        </div>

        {/* Desired Year to Work */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Desired Year to Work / 就職希望年度 <span className="text-danger">*</span>
          </label>
          <select
            value={formData.desiredYear}
            onChange={(e) => handleChange('desiredYear', e.target.value)}
            className={`form-select ${errors.desiredYear ? 'is-invalid' : ''}`}
            style={{ fontSize: '0.9rem' }}
          >
            <option value="">Please Select / 選択してください</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="graduated">Graduated / 既卒</option>
            <option value="others">Others / その他</option>
          </select>
          {errors.desiredYear && (
            <div className="invalid-feedback">{errors.desiredYear}</div>
          )}
        </div>

        {/* Age */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Age / 年齢
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            placeholder="Age / 年齢"
            min="1"
            max="150"
          />
          {errors.age && (
            <div className="invalid-feedback">{errors.age}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Email Address / メールアドレス
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Email Confirmation */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Email Address (Confirmation) / メールアドレス（確認）
          </label>
          <input
            type="email"
            value={formData.emailConfirm}
            onChange={(e) => handleChange('emailConfirm', e.target.value)}
            className={`form-control ${errors.emailConfirm ? 'is-invalid' : ''}`}
            placeholder="example@email.com"
          />
          {errors.emailConfirm && (
            <div className="invalid-feedback">{errors.emailConfirm}</div>
          )}
        </div>

        {/* Interests */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            What are you interested in? / どのようなことに興味がありますか？ <span className="text-danger">*</span>
          </label>
          <div className="d-flex flex-column gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Full-time Employment in Japan / 日本での正社員')}
                onChange={() => handleInterestToggle('Full-time Employment in Japan / 日本での正社員')}
                id="interest-ft"
              />
              <label className="form-check-label" htmlFor="interest-ft" style={{ color: '#333333' }}>
                Full-time Employment in Japan / 日本での正社員
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Internship in Japan / 日本でのインターンシップ')}
                onChange={() => handleInterestToggle('Internship in Japan / 日本でのインターンシップ')}
                id="interest-int"
              />
              <label className="form-check-label" htmlFor="interest-int" style={{ color: '#333333' }}>
                Internship in Japan / 日本でのインターンシップ
              </label>
            </div>
          </div>
          {errors.interests && (
            <div className="text-danger small mt-2">{errors.interests}</div>
          )}
        </div>

        {/* Optional Comments */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333333' }}>
            Let us know about you and stay in touch with our HR! / あなたについて教えてください。人事部と連絡を取り合いましょう！
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            rows={4}
            maxLength={500}
            className="form-control"
            placeholder="Thank you for your words. / ご要望やコメントをご入力ください"
          />
          <div className="form-text text-end" style={{ color: '#666666' }}>
            {formData.comments.length}/500
          </div>
        </div>

        {/* Privacy Policy Consent */}
        <div className="mb-3 mb-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) => handlePrivacyChange(e.target.checked)}
              id="privacy-consent"
            />
            <label className="form-check-label" htmlFor="privacy-consent" style={{ color: '#333333' }}>
              I agree to the Privacy Policy / プライバシーポリシーに同意します <span className="text-danger">*</span>
            </label>
          </div>
          {errors.privacyConsent && (
            <div className="text-danger small mt-1">{errors.privacyConsent}</div>
          )}
          
          {/* Privacy Policy Dropdown */}
          <div className="mt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsPrivacyPolicyOpen(!isPrivacyPolicyOpen)}
              className="btn btn-link p-0 text-decoration-none d-flex align-items-center justify-content-between w-100"
              style={{ 
                color: '#00B7CE',
                fontWeight: '500',
                fontSize: '0.9rem',
                textAlign: 'left'
              }}
            >
              <span>Click to read privacy policy / プライバシーポリシーを読む</span>
              <span 
                style={{ 
                  transform: isPrivacyPolicyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  fontSize: '0.8rem',
                  marginLeft: '0.5rem'
                }}
              >
                ▼
              </span>
            </button>
            
            <div
              style={{
                maxHeight: isPrivacyPolicyOpen ? '2000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease-out',
                marginTop: isPrivacyPolicyOpen ? '1rem' : '0'
              }}
            >
              <div 
                style={{ 
                  padding: '1.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  color: '#333333'
                }}
              >
                {/* Japanese Privacy Policy */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3" style={{ color: '#00B7CE', fontSize: '1rem' }}>
                    個人情報の取扱いについて
                  </h6>
                  <p style={{ marginBottom: '0.75rem' }}>
                    本フォームで取得する個人情報（氏名、メールアドレス、その他入力内容）は、採用への応募お問い合わせへの対応およびそれに必要なご連絡の目的にのみ利用します。
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    当社はPDPA（タイ個人データ保護法）の趣旨に基づき個人情報を適切に管理し、入力者への全ての連絡および要件が終了次第60日以内に、安全な方法で全データを削除・破棄します（法令等により保存が必要な場合を除きます）。ご本人の同意なく、第三者へ個人情報を提供することはありません。
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    個人情報の取扱いに関するお問い合わせ：<br />
                    協和テクノロジイズ株式会社 採用担当 平田<br />
                    E-mail： r-hirata@star.kyotec.co.jp
                  </p>
                </div>

                {/* English Privacy Policy */}
                <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '1rem' }}>
                  <h6 className="fw-bold mb-3" style={{ color: '#00B7CE', fontSize: '1rem' }}>
                    Privacy Notice
                  </h6>
                  <p style={{ marginBottom: '0.75rem' }}>
                    Personal data collected through this form (including your name, email address, and any other information you provide) will be used only for responding to your inquiries and for the recruitment related purposes such as screening, communication, and administration, and only to the extent necessary for the recruitment operations.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    When collecting personal data, we clearly specify the purpose of use and obtain such data by lawful and fair means. Personal data will not be used for any purpose other than the recruitment application purposes. If it becomes necessary to change the purpose of use, we will notify you in advance and obtain your consent where required.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    The provision of personal data is entirely voluntary.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    We will not disclose or provide your personal data to any third party without the prior consent, except where disclosure is required by applicable laws or requested by courts, police, tax authorities, or other authorized public institutions.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    We comply with Thailand's Personal Data Protection Act (PDPA) and related laws and manage personal data in an appropriate and secure manner.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    We implement technical and organizational security measures to prevent unauthorized access, loss, leakage, alteration, or destruction of personal data.
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    All personal data collected will be securely deleted or disposed of once all communications and related matters with Kyowa Technologies Co., Ltd. have been completed, and in any case within 60 days from the date of collection, unless retention is required by applicable laws.
                  </p>
                  <p style={{ marginBottom: '0' }}>
                    For inquiries regarding the handling of personal data:<br />
                    Kyowa Technologies Co., Ltd. – HR Contact: Ms. R. Hirata<br />
                    E-mail: r-hirata@star.kyotec.co.jp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-100 fw-bold"
            style={{ fontSize: '1.1rem', padding: '12px', backgroundColor: '#00B7CE', borderColor: '#00B7CE' }}
          >
            {isSubmitting ? 'Submitting... / 送信中...' : 'Submit / 送信'}
          </button>
        </div>
      </form>

      {/* Company Name at Bottom with Logos 2 and 4 */}
      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="mb-3" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <img 
            src="/logo2.png" 
            alt="Logo 2" 
            style={{ 
              height: 'clamp(3.5rem, 8vw, 6.5rem)',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'inline-block'
            }}
            onError={(e) => {
              console.error('Logo 2 failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />
          <img 
            src="/logo4.png" 
            alt="Logo 4" 
            style={{ 
              height: 'clamp(3.5rem, 8vw, 6.5rem)',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'inline-block',
              transform: 'rotate(-8deg)'
            }}
            onError={(e) => {
              console.error('Logo 4 failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <p className="fw-bold mb-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#00B7CE' }}>
          Kyowa Technologies Co., Ltd.
        </p>
      </div>
    </div>
  )
}

export default RegistrationForm
