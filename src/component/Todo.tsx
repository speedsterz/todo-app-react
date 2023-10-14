import { useEffect, useState } from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import styles from "./Todo.module.css";
import style_light from "./Todo_light.module.css";
import style_dark from "./Todo_dark.module.css";
import iconSun from "../images/icon-sun.svg";
import iconMoon from "../images/icon-moon.svg";
import React from "react";

interface object_list {
  job: string;
  active: boolean;
  id: string;
}

export const Todo = () => {
  const [todolist, setTodolist] = useState<object_list[]>([]);
  const [Darkmode, setDarkmode] = useState(false);
  const [Select, setSelect] = useState("All");

  //Dark Mode

  // Add todo
  const Check_todo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value !== "") {
      const obj = {
        job: (e.target as HTMLInputElement).value,
        active: true,
        id: uuidv4(),
      };
      setTodolist(
        produce((draft) => {
          draft.push(obj);
        })
      );
      (e.target as HTMLInputElement).value = "";
    }
  };

  //onclick
  const handleClick = (item: object_list) => {
    setTodolist(
      produce((draft) => {
        const b = draft.find((i) => i.job === item.job && i.id == item.id);
        if (b) b.active = !item.active;
      })
    );
  };

  //remove
  const remove = (item: object_list) => {
    setTodolist(todolist.filter((i) => i.id !== item.id));
  };

  // Icon moon & sun
  let icon_path;
  if (Darkmode) icon_path = iconSun;
  else icon_path = iconMoon;

  let Itemleft = 0;
  if (todolist.length > 0) {
    todolist.map((item) => {
      if (item.active) Itemleft++;
    });
  }

  //Filtering List
  let filterd_list = todolist;
  if (Select == "Active")
    filterd_list = filterd_list.filter((item) => item.active);
  else if (Select == "Completed")
    filterd_list = filterd_list.filter((item) => !item.active);

  useEffect(() => {
    if (Darkmode) {
      document.body.id = "dark";
    } else {
      document.body.id = "light";
    }
  }, [Darkmode]);

  let style_theme: CSSModuleClasses;
  if (Darkmode) style_theme = style_dark;
  else style_theme = style_light;

  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className={styles.h1Style}>TODO</h1>
        <img
          src={icon_path}
          alt=""
          className={styles.imgMode}
          onClick={() => {
            setDarkmode(!Darkmode);
          }}
        />
      </div>
      <div
        className={[
          styles.todo_inputG,
          "d-flex align-items-center",
          style_theme.bgColor,
        ].join(" ")}
      >
        <span
          className={[
            styles["checkinput-active"],
            style_theme["checkinput-active"],
          ].join(" ")}
        ></span>
        <input
          type="text"
          placeholder="Create a new todo..."
          onKeyDown={Check_todo}
          className={[styles.todo_input, "list-group-item"].join(" ")}
        />
      </div>
      <div>
        <ul className="list-group">
          {filterd_list.map((item, id) => (
            <li
              className={["list-group-item", style_theme.bgColor].join(" ")}
              key={id}
            >
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className={
                    item.active
                      ? [
                          styles["checkinput-active"],
                          style_theme["checkinput-active"],
                        ].join(" ")
                      : styles["checkinput-completed"]
                  }
                  onClick={() => handleClick(item)}
                ></div>
                <h4 className={item.active ? "" : styles.TextCompleted}>
                  {item.job}
                </h4>
                <img
                  onClick={() => remove(item)}
                  className="cross"
                  src="./src/images/icon-cross.svg"
                  alt=""
                />
              </div>
            </li>
          ))}
          {todolist.length > 0 && (
            <>
              <li
                className={[style_theme.bgColor, "list-group-item"].join(" ")}
              >
                <div
                  className={[
                    styles.lastli,
                    "d-flex justify-content-between",
                  ].join(" ")}
                >
                  <div>{Itemleft} items left</div>
                  <div
                    className={[
                      styles.SelectModes,
                      styles.gap,
                      "d-flex Ext1",
                    ].join(" ")}
                  >
                    <span
                      className={Select == "All" ? styles.SelectMode : ""}
                      onClick={() => setSelect("All")}
                    >
                      All
                    </span>
                    <span
                      className={Select == "Active" ? styles.SelectMode : ""}
                      onClick={() => setSelect("Active")}
                    >
                      Active
                    </span>
                    <span
                      className={Select == "Completed" ? styles.SelectMode : ""}
                      onClick={() => setSelect("Completed")}
                    >
                      Completed
                    </span>
                  </div>
                  <div
                    className={styles.clearCompleted}
                    onClick={() =>
                      setTodolist(todolist.filter((item) => item.active))
                    }
                  >
                    Clear Completed
                  </div>
                </div>
              </li>
            </>
          )}
        </ul>
        {todolist.length > 0 && (
          <>
            <li
              className={[style_theme.bgColor, "list-group-item Ext"].join(" ")}
            >
              <div
                className={[
                  styles.SelectModes,
                  styles.gap,
                  styles.SelectMode_mobile,
                  "d-flex justify-content-center align-items-center",
                ].join(" ")}
              >
                <span
                  className={Select == "All" ? styles.SelectMode : ""}
                  onClick={() => setSelect("All")}
                >
                  All
                </span>
                <span
                  className={Select == "Active" ? styles.SelectMode : ""}
                  onClick={() => setSelect("Active")}
                >
                  Active
                </span>
                <span
                  className={Select == "Completed" ? styles.SelectMode : ""}
                  onClick={() => setSelect("Completed")}
                >
                  Completed
                </span>
              </div>
            </li>
            <p
              style={{
                textAlign: "center",
                marginBlock: "2rem",
                opacity: "0.5",
              }}
            >
              Drag and drop to reorder list
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
