import { FORMS } from '@constants/account'
import { AccountForm } from '@models/account'
import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { VALIDATION_MESSAGE_MAP } from '@constants'
import Select from '@shared/Select'
import dynamic from 'next/dynamic'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

type FormData = {
  [key: string]: string
}

interface FormProps {
  onNext: (formValues: FormData) => void
}

export default function Form({ onNext }: FormProps) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })

  const component = useCallback(
    (form: AccountForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [formState.errors, register],
  )

  return (
    <div style={{ padding: 24 }}>
      <form>
        {FORMS.map((form) => {
          return (
            <Fragment key={form.id}>
              {component(form)}
              <Spacing size={8} />
            </Fragment>
          )
        })}
      </form>
      <FixedBottomButton label="개설하기" onClick={handleSubmit(onNext)} />
    </div>
  )
}
