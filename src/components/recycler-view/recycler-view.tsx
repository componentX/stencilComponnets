import { Component, Prop, State, Event, EventEmitter, Watch, h, Method } from "@stencil/core";

@Component({
  tag: 'recycler-view',
  styleUrl: 'recycler-view.css',
  // shadow: true
})

// class ItemData extends Object{
//   title: string
//   imgUrl: string
//   description: string
// }

export class RecyclerView {
  @Prop() loading: boolean = false;
  @Prop() loadingTxt: string = "加载中...";
  @Prop() finished: boolean = true;
  @Prop() finishedTxt: string = "没有更多数据了";
  @State() dataList: Array<any> = [
    {
      title: "测试标题1",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题2",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题3",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题4",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题5",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题6",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题7",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题8",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题9",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题10",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题11",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题12",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    },
    {
      title: "测试标题13",
      imgUrl: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg",
      description: "https://pic4.zhimg.com/50/v2-f7f04dc4f561238aae769f168a14ce8a_hd.jpg"
    }
  ];
  // 最大缓存数量
  @State() pageSize: number = 6;
  @State() showDataList: Array<any> = [];


  @Event() loadingMore: EventEmitter;
  @Event() loadingOver: EventEmitter;

  containerView !: HTMLDivElement;
  itemViewArray : Array<HTMLDivElement> = [];
  topEmptyHolderView !: HTMLDivElement;
  // topEmptyHolderViewStyle : object = {};
  itemHeight: number;
  fixedScrollTop: number;
  lastStart: number;

  @Watch("dataList")
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: , oldValue is:', newValue, oldValue);
  }

  componentWillLoad(){
    console.log("componentWillLoad---");
    this.showDataList = this.dataList.slice(0, this.pageSize);
    console.log("最大显示 item 数量：" + this.showDataList.length);
  }
  connectedCallback(){
    console.log("connectedCallback---");
  }

  componentDidLoad(){
    console.log("componentDidLoad---");
    console.log("容器高度：", this.containerView? this.containerView.getBoundingClientRect().height :0);
    this.lastStart = 0; // 上次开始的位置
    // showDom  无法使用querySelector API；
    // const item = document.querySelector('.item');
    // const itemStyle = item.getBoundingClientRect();
    this.itemHeight= 80; // itemStyle.height + itemStyle.top + itemStyle.bottom;
    console.log("item 高度：", this.itemHeight);
    console.log(this.itemViewArray);
  }

  // @Method()
  // updateCacheListView(){
  //   return this.showDataList.map((itemData, index) =>
  //     <div class="item" ref={ (el) => {this.itemViewArray[index] = el as HTMLDivElement}}>
  //       <img src={ itemData.imgUrl } class="item-img"/>
  //       <div class="item-right-block">
  //         <div class="item-title">{itemData.title}</div>
  //         <div class="item-description">{itemData.description}</div>
  //       </div>
  //     </div>
  //   );
  // }

  @Method()
  async onListScroll(){
    console.log("---scroll---", this.containerView);
    console.log(this.containerView.scrollTop, this.containerView.scrollHeight);
    this.fixedScrollTop = this.containerView.scrollTop - this.containerView.scrollTop % this.itemHeight;
    // this.topEmptyHolderView.style.height = this.fixedScrollTop + "px";
    // height: 810000px; transform: translateY(0px);
    // this.containerView.style.transform = "translateY(" + this.fixedScrollTop + "px)";
    this.lastStart = Number.parseInt(String(this.containerView.scrollTop / this.itemHeight));
    // if(this.containerView.scrollTop % this.itemHeight > 0){
    //   this.lastStart++;
    // }
    console.log("fixedScrollTop:" + this.fixedScrollTop, "lastStart:" + this.lastStart);

    for (let i = this.lastStart, len= this.lastStart + this.pageSize; i < len; i++) {
      let index = i % this.pageSize;
      let cssIndex = (i - this.lastStart) % len;
      // document.querySelector(`.item${index}`).innerHTML = `<p>${data[i].index}楼：</p><p>${data[i].score}</p>`;
      // document.querySelector(`.item${index}`).style.transform = `translateY(${itemHeight*cssIndex}px)`;
      console.log("index:" + index, "cssIndex:" + cssIndex);
      this.itemViewArray[index].style.transform = `translateY(${this.itemHeight * cssIndex}px)`;
    }
  }

  // onScrollCapture={() => this.onListScroll()}
  render() {
    return (
      <div class="recycler-container" ref={ (el) => {this.containerView = el as HTMLDivElement}} onScroll={() => this.onListScroll()}>
        <div ref={ (el) => {this.topEmptyHolderView = el as HTMLDivElement}}/>
        <div class="recycler-container" style={{
          transform: "translateY(0px)", //  必须添加此属性
          height: "2000px", // todo: 固定item 高度数量计算
          maxHeight: "2000px",
          backgroundColor: "#f5face"
        }}>
          {this.showDataList.map((itemData, index) =>
            <div class="item" ref={ (el) => {this.itemViewArray[index] = el as HTMLDivElement}}
                 style={
                   {
                     transform: "translateY(" + index * 80 + "px)",
                     // background: "#121212"
                   }
                 }>
              <img src={ itemData.imgUrl } class="item-img"/>
              <div class="item-right-block">
                <div class="item-title">{itemData.title}</div>
                <div class="item-description">{itemData.description}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
