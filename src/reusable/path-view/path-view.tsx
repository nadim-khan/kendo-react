import * as React from 'react';
import { Breadcrumb, BreadcrumbLinkMouseEvent, BreadcrumbLinkKeyDownEvent } from '@progress/kendo-react-layout';
import './path-view.scss'

interface DataModel {
    id: string;
    text?: string;
    icon?: React.ReactNode;
    iconClass?: string;
}

const items: DataModel[] = [
    {
        id: 'home',
        text: 'Home',
        iconClass: 'k-font-icon k-i-home'
    },
    {
        id: 'products',
        text: 'Products'
    },
    {
        id: 'computer',
        text: 'Computer'
    },
    {
        id: 'gaming',
        text: 'Gaming'
    },
    {
        id: 'keyboard',
        text: 'Keyboard'
    }
];

const PathView = () => {
    const [data, setData] = React.useState<DataModel[]>(items);

    const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {
        const itemIndex: number = data.findIndex((curValue) => curValue.id === event.id);
        const newData: DataModel[] = data.slice(0, itemIndex + 1);

        setData(newData);
    };

    const handleButtonClick = (event: React.MouseEvent) => {
        if (event) {
            setData(items);
        }
    };

    const handleKeyDown = (event: BreadcrumbLinkKeyDownEvent) => {
        if (event.nativeEvent.keyCode === 13) {
            const itemIndex = data.findIndex((curValue) => curValue.id === event.id);
            const newData = data.slice(0, itemIndex + 1);
    
            setData(newData);
        }
    };

    return (
      <div>
        <Breadcrumb 
          data={data}
          onItemSelect={handleItemSelect}
          onKeyDown={handleKeyDown}
          />
      </div>
    );
};

export default PathView;