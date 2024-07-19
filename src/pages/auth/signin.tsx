import Text from '@shared/Text'
import Flex from '@shared/Flex'
import { BuiltInProviderType } from 'next-auth/providers/index'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'

interface SigninPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}

export default function SigninPage({ providers }: SigninPageProps) {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Text bold={true}>My Account</Text>
        <Spacing size={80} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/',
                  })
                }
              >
                {provider.name} LOGIN
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
