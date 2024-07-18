import useEventBanners from '@hooks/useEventBanners'
import withSuspense from '@shared/hocs/withSuspense'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import Skeleton from '@shared/Skeleton'
import Image from 'next/image'
import styled from '@emotion/styled'

function EventBanners() {
  const { data } = useEventBanners()

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  css={bannerStyles}
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                >
                  <Flex direction="column">
                    <Text bold={true}>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

const Container = styled.div`
  padding: 24px;
`

export function BannerSkeleton() {
  return (
    <Container>
      <Skeleton width="100%" height={96} style={{ borderRadius: 8 }} />
    </Container>
  )
}

export default withSuspense(EventBanners, {
  fallback: <BannerSkeleton />,
})
