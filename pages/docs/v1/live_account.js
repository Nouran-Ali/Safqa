import React from 'react'
import { CodeSnippetCopy, LinkHierarchyNew, MainTitle, NoteText , SideNav, Table, TableThree, TableTwo } from '../../../comps/docs/v1/DocsV1Components'
import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};

const items = [
    {
      key: '1',
      label: `Live Account 1`,
      children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod`,
    },
    {
      key: '2',
      label: `Live Account 2`,
      children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod`,
    },
    {
      key: '3',
      label: `Live Account 3`,
      children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod`,
    },
  ];

export default function LiveAccount() {
    
    return (
        <div>
            <CodeSnippetCopy
                code={`Text(
'I like Flutter!',
style: TextStyle(fontWeight: FontWeight.bold),
);`}
            />
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="mb-4 fs-5"/>
            <NoteText text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod`} />
            <Table />
            <TableTwo />
            <TableThree />
        </div>
    )
}

