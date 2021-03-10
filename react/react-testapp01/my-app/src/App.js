import React, { Component } from 'react';
import './App.css';
import NoteItem from "./Noteitem.js"

class App extends Component {

  // NoteListをstateに定義、初期値はlocalStorageから取得または []
  state = {
    NoteList: JSON.parse(localStorage.getItem("NoteList")) || []
  }

  // NoteList itemの追加
  addNote = (item, callBack) => {
    // NoteList stateに追加
    this.setState(
      {
        NoteList: this.state.NoteList.concat(item)
      },
      () => {
        // localStorageにNoteList stateを保存
        localStorage.setItem("NoteList", JSON.stringify(this.state.NoteList))
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack()
      }
    )
  }

  // NoteListからitemを削除
  removeNote = (item, callBack) => {
    this.setState(
      {
        NoteList: this.state.NoteList.filter(x => x !== item)
      },
      () => {
        // localStorageにNoteList stateを保存
        localStorage.setItem("NoteList", JSON.stringify(this.state.NoteList))
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack()
      }
    )
  }

  render() {
    return (
      <div className="App">
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"]
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];

            // Note stateに追加
            this.addNote(
              {
                  title: titleElement.value,
                  description: descriptionElement.value
              },
              // stateの変更後に入力した値を空にする
              () => {
                titleElement.value = "";
                descriptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <input
              id="title"
              placeholder="title"
            />
            <textarea
              id="description"
              placeholder="description"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              登録
            </button>
          </div>
        </form>
        <div>
        {/* Note配列の要素数分NoteItemコンポーネントを展開 */}
        {this.state.NoteList.map(Note => (
            <NoteItem
              key={Note.title}
              title={Note.title}
              description={Note.description}
              // クリックされたItemをNoteList stateから削除
              onClick={() => this.removeNote(Note)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
