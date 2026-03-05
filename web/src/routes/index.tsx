import { createFileRoute } from '@tanstack/react-router'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { SectionDataTable } from '../components/section-data-table'
import { SectionTitle } from '../components/section-title'
import { Sidebar } from '../components/sidebar'
import { CodeBlock } from '../components/ui/codeblock'
import { WebhookDetailHeader } from '../components/webhook-detail-header'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const overviewData = [
    { key: 'Method', value: 'POST' },
    { key: 'MetStatus Codehod', value: '200' },
    { key: 'Content-Type', value: 'application/json' },
    { key: 'Content-Length', value: '28276 bytes' },
  ]

  return (
    <div className="h-screen bg-zinc-900">
      <Group>
        <Panel defaultSize="20%" minSize="15%" maxSize="40%">
          <Sidebar></Sidebar>
        </Panel>

        <Separator className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />

        <Panel defaultSize="80" minSize="60">
          <div className="flex h-full flex-col">
            <WebhookDetailHeader></WebhookDetailHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <SectionTitle>Request Overview</SectionTitle>
                  <SectionDataTable data={overviewData}></SectionDataTable>
                </div>
                <div className="space-y-4">
                  <SectionTitle>Query Parameters</SectionTitle>
                  <SectionDataTable data={overviewData}></SectionDataTable>
                </div>
                <div className="space-y-4">
                  <SectionTitle>Headers</SectionTitle>
                  <SectionDataTable data={overviewData}></SectionDataTable>
                </div>
                <div className="space-y-4">
                  <SectionTitle>Request Body</SectionTitle>
                  <CodeBlock
                    code={JSON.stringify(overviewData, null, 2)}
                  ></CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Group>
    </div>
  )
}
