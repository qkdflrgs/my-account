import Flex from '@shared/Flex'
import Button from '@shared/Button'
import { ChangeEvent, useCallback, useState } from 'react'
import { Event } from '@models/event'
import TextField from '@shared/TextField'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import Preview from '../event/Preview'

export default function EventForm() {
  const [formValues, setFormValues] = useState<Event>({
    title: '',
    subTitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '',
  })

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [],
  )

  const handleSubmitFormValues = async () => {
    await setDoc(doc(collection(store, COLLECTIONS.EVENT)), formValues)

    alert('이벤트 정보를 추가했습니다')
  }

  const isPossibleSubmit = Object.values(formValues).every(
    (value) => value !== '',
  )

  return (
    <Flex direction="column">
      <Flex>
        <Flex direction="column" style={{ flex: 1 }}>
          <TextField
            name="title"
            label="이벤트 제목"
            value={formValues.title}
            onChange={handleFormValues}
          />
          <TextField
            name="subTitle"
            label="이벤트 부제목"
            value={formValues.subTitle}
            onChange={handleFormValues}
          />
          <textarea
            style={{ height: 400 }}
            name="contents"
            value={formValues.contents}
            onChange={handleFormValues}
          />
          <TextField
            name="buttonLabel"
            label="버튼명"
            value={formValues.buttonLabel}
            onChange={handleFormValues}
          />
          <TextField
            name="link"
            label="링크"
            value={formValues.link}
            onChange={handleFormValues}
          />
          <TextField
            name="endDate"
            label="이벤트 종료일"
            value={formValues.endDate}
            onChange={handleFormValues}
          />
        </Flex>
        <Flex style={{ flex: 2 }}>
          <Preview data={formValues} mode="edit" />
        </Flex>
      </Flex>
      <Button
        onClick={handleSubmitFormValues}
        disabled={isPossibleSubmit === false}
      >
        저장하기
      </Button>
    </Flex>
  )
}
