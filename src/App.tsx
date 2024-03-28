import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");//const [inputValue, setInputValue]の左側の変数（inputValue）の初期値がuseState("")の空文字で、set関数で追加したりできる。
  const [todos, setTodos] = useState<Todo[]>([]);  //型指定<Todo[]>　Todoの型のプロパティの配列しかいれられない。
//型の定義
  type Todo = {                                    // type　型の定義
    inputValue: string;                            // string 文字列    変数:型（ここではデータ型);
    id: number;                                    // number 数値
    checked: boolean;                              // boolean 真偽値
  };
  
//関数handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //引数の型指定。React.ChangeEvent<HTMLInputElement>
    // console.log(e.target.value);                                    コンソールでinputできてるか確認(デバッグ)。
    setInputValue(e.target.value);                                   //set関数にいれる。するとinputValueに格納される。
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();                                              //Enterおしてもリロードしないようにしている。(下の関数内を実行したいから)

    //新しいTodoを作成(抽象的なTodoから具象的なTodoに)
    const newTodo: Todo = {
      inputValue:  inputValue,                                       //後ろのinputValueは、useStateで保持している変数。
      id: todos.length,                                              //配列の長さでid指定。（本来ユニークなidを使う。）
      checked: false,                                                //新規作成したとき完了してないからfalse。
    };

    setTodos([newTodo, ...todos]);                                   //既存のtodosにスプレッド構文を用いて、新しいnewTodoが入っていく。
    setInputValue("");                                               //投稿した後、空にしたいから。
  };

  const handleEdit = (id: number, inputValue: string) => {           //型指定しないとエラー出る。
    const newTodos = todos.map((todo) =>{
      if(todo.id === id){                                            //86行目でとったidと同じなら
        todo.inputValue = inputValue;                                //今から打ち込む文字列を左のinputValueに入れる。
      }
      return todo;                                                   //todo.inputValueを更新した状態でtodoを返す。
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) =>{
      if(todo.id === id){
        todo.checked = !checked;                                     //反転させる。
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo)=> todo.id !== id);          //この条件式（!==に注意）がTrueのもののみ残す。
    setTodos(newTodos);                                              //filterで削除したものをいれる。
  };
/*type Todoは、Todoという型がどのような形状であるべきかを定義している。
これは、プログラム内でTodo型のオブジェクトを扱う際の「ルール」や「設計図」と考えることができる。
const newTodo: Todoは、具体的なTodo型のオブジェクトを作成し、それをnewTodoという変数に割り当てている。
これは、上記の「設計図」に基づいて実際の「建物」を建てるようなものだ。*/
/*typeは、TypeScriptで新しい型を定義するために使用される。
これにより、特定の構造を持つオブジェクトや、特定の値の集合など、様々なデータ構造を表現できる。*/
//const 変数名＝変数に入れる値; 値書き換えを禁止した変数を宣言する（定数の宣言）。
//フックス useState 特定の値を保持、管理することができる。
//handleChangeなどは適当な関数。
//スプレッド構文は、配列の要素やオブジェクトのプロパティを別の配列やオブジェクトに展開したり、まとめたりすることができる。
//アロー関数は、カッコに引数のリスト、アロー記号=>、中カッコに処理内容を書く。
//filter関数は、配列の各要素に対してテストを行い、そのテストを通過（trueを返す）した要素だけからなる新しい配列を作る。
//!==は、ノットイコール。
/*プロパティは、オブジェクトやクラスが持つデータの属性を指す。
オブジェクトの特徴や状態を表す値を格納し、それによってオブジェクトの振る舞いが決定されます。*/
//()の中は、変数しか入れられない。
/*set関数とは、重複を許さない要素のコレクションを作成するためのビルトインオブジェクトです。
Setオブジェクトに要素を追加するには、addメソッド、スプレッド構文、配列メソッドなど。*/

//ここからReact部分
  return (
    <div className="App">
      <div>
        <h2>Todolist with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text"
          onChange={(e) => handleChange(e)}                         //inputに、文字を打ち込むたびに呼ばれる。
          className="inputText"
          />
          <input type="submit"                                      //ボタン作成。
          value="作成"
          className="submitButton"
          />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (                                    //todosからmap関数を使って、todoという変数を用意して取り出す。
            <li key={todo.id}>
              <input
            type="text"
            onChange={(e) => handleEdit(todo.id, e.target.value)}   //2つの引数をとる。
            className="inputText"
            value={todo.inputValue}
            disabled={todo.checked}
          />
          <input type="checkbox"
          onChange={(e) => handleChecked(todo.id, todo.checked)}    //どのidに対してチェックするか否か。
          />
          <button onClick={() => handleDelete(todo.id)}> 消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;

//<h>は、タイトル。
//<form>は、フォームを構成する部品を囲って、どのプログラムに値を渡すか、どのような方法でデータを送信するかを決めれる。
//<input>は、formタグの部品で、実際に入力するためのフィールドを設置できる。
//<div>は、単体では意味をなさないが、囲った部分をブロック要素としてまとめて扱うことができる。
//ブロック要素は、レイアウトが詰まった一つの箱。margin、paddingなどのレイアウトやwidth、heightなどのサイズも自由に決めれる。
//<ul><ol><li>の3つのタグを使って箇条書き（リスト）を作ることができる。liタグはいくらでも増やせる。
//<button>は、ボタンを表示させる。画面遷移やフォーム情報の送信などのアクションを起こすことができる。
//value属性は、inputタグやbuttonタグなどの入力フィールドの初期値を設定できる。
//type属性は、inputタグでもっとも一般的なやつ。type="text"が初期値。
//name属性は、部品の名前。サーバーに送られたとき、ラベルの役割をする。
//disabled属性は、存在しているだけで、その要素は不活性となる。
//classNameは、css適応させるやつ。
//onClickは、クリックすることで発生。
//onSubmitは、フォームが送信されるときに発生。クリックでもキーボード操作でも起動。
//onChangeは、フォーム内の要素の内容が変更された時に起こるイベント処理の事。
//イベントとは、ドキュメント内で起こる出来事のこと。
//<li key={todo.id}>で固有のkeyを指定。
