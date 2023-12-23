import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
    token: {
        fontSize: 14,
        colorPrimary: '#4062d8',
    },
    components:{
        Menu:{
            darkItemBg:'#222943',
            subMenuItemBorderRadius:0,
            itemBorderRadius:0,
            itemHeight:44,
        },
        Breadcrumb:{
            itemColor:'#4e5469',
            linkColor:'#4e5469',
            lastItemColor:'#4062d8'
        }
    }
};

export default theme;