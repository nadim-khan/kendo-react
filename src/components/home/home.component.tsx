
import React from 'react'
import { Link } 
    from 'react-router-dom'
import ReusableCards from '../../reusable/reusable-cards/reusable-card';
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import {
    Breadcrumb,
    BreadcrumbLinkMouseEvent,
    BreadcrumbLinkKeyDownEvent,
  } from "@progress/kendo-react-layout";
import PathView from '../../reusable/path-view/path-view';
    
const Home = (props)=>{
    return (
        <div className="grid-layout-container">
            <GridLayout
                gap={{ rows: 6, cols: 10 }}
                rows={[
                { height: 20 },
                { height: 100 },
                { height: 100 },
                { height: 20 },
                { height: 660 },
                ]}
                cols={[{ width: 270 }, { width: 270 }, { width: 310 }]}
            >
                <GridLayoutItem row={1} col={1} colSpan={3}>
                    <div className="k-text-inverse k-text-uppercase k-font-weight-bold">
                        <PathView></PathView>
                    </div>
                </GridLayoutItem>
                <GridLayoutItem row={2} colSpan={10}>
                    <ReusableCards count={5}></ReusableCards>
                </GridLayoutItem>
            </GridLayout>
            
        </div>
    )
}

export default Home