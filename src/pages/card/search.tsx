import Badge from '@shared/Badge'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import { getSearchCards } from '@remote/card'
import Input from '@shared/Input'
import Top from '@shared/Top'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import useDebounce from '@hooks/useDebounce'

export default function SearchPage() {
  const [keyword, setKeyword] = useState<string>('')
  const debouncedKeyword = useDebounce(keyword)
  const navigate = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = useQuery({
    queryKey: ['cards', debouncedKeyword],
    queryFn: () => getSearchCards(debouncedKeyword),
    enabled: debouncedKeyword !== '',
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div>
      <Top title="추천 카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
      </div>
      {keyword !== '' && data?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <Text>찾으시는 카드가 없습니다</Text>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback && <Badge label={card.payback} />}
              withArrow={true}
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
