import BillingForm from "@/components/BillingForm"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) {
        redirect('/auth-callback?origin=dashboard/billing')
    }

    return <BillingForm />
}

export default Page
