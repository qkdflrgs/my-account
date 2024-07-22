import { TERM_LIST } from '@constants/account'
import { Term } from '@models/account'
import { MouseEvent, useState } from 'react'
import Agreement from '@shared/Agreement'
import dynamic from 'next/dynamic'

interface TermsProps {
  onNext: (termIds: string[]) => void
}

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

export default function Terms({ onNext }: TermsProps) {
  const [termsAgreements, setTermsAgreements] = useState(
    generateInitialValues(TERM_LIST),
  )

  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreements((prev) => {
      return prev.map((term) => (term.id === id ? { ...term, checked } : term))
    })
  }

  const handleAllAgreement = (e: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prev) => {
      return prev.map((term) => ({ ...term, checked }))
    })
  }

  const isAllAgree = termsAgreements.every((term) => term.checked)
  const isAllMandatoryTerms = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={isAllAgree} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관 동의"
        disabled={isAllMandatoryTerms === false}
        onClick={() =>
          onNext(
            termsAgreements.filter((term) => term.checked).map(({ id }) => id),
          )
        }
      />
    </div>
  )
}

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({
    ...term,
    checked: false,
  }))
}
