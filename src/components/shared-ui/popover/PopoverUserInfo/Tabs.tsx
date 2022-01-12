import { HOCUpdateMutableData } from 'src/components/HOCs/HOCUpdateMutableData'
import TabsContent from './TabsContent'

type Props = {
  className?: string
  data: UserData
}

const Tabs: React.FC<Props> = ({ data }) => {
  const TabsComp = HOCUpdateMutableData({
    WrappedComponent: TabsContent,
    data,
  })
  return <TabsComp data={data} />
}

export default Tabs
