import React, { useEffect, useState } from "react";
import Send_Message_Input from "@/components/normal/Send_Message_Input";
import Auth_Layout from "@/components/normal/Auth_Layout";
import useSocketStore from "@/stores/Socket.store";
import Left_Nav_Bar from "@/components/headers/left/Left_Nav_Bar";

const Chat = () => {
  const [message, setMessage] = useState<string>("");

  const { connect, disConnect } = useSocketStore();

  useEffect(() => {
    console.log("Coming...");
    connect();
    return () => {
      disConnect();
    };
  }, [connect, disConnect]);

  return (
    <Auth_Layout>
      <main className="flex h-screen relative">
        <div className="w-[25rem]">
          <div>
            <Left_Nav_Bar />
            <div className="h-[3rem] bg-gray-500">
              <h1>Search bar</h1>
            </div>
          </div>
          <div className="h-[calc(100%-7rem)] bg-red-500  overflow-y-auto">
            <h1>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
              nihil id minima molestiae ad dolorem, iste iure ipsum harum
              officiis consequatur repellat? Nulla harum dolorum quasi minima
              quidem corporis officia, exercitationem ullam necessitatibus
              deleniti quibusdam modi a reprehenderit, velit laudantium pariatur
              ducimus adipisci inventore ea vitae consequuntur. Illo dolorum
              labore sapiente porro nam laboriosam hic unde repellat amet
              commodi eum nihil praesentium exercitationem soluta omnis dolor
              ab, ea tempore consequatur alias assumenda? Dolor aut excepturi
              possimus ab cum enim ipsa animi magnam numquam reiciendis odit
              illum nostrum suscipit eos doloribus provident libero accusamus
              esse dolorum consequuntur, nesciunt praesentium quibusdam dolorem.
              Illo rerum aspernatur placeat, nisi sed iste, tempore temporibus
              amet aliquam neque cum. Aspernatur saepe placeat eius quae ea
              omnis eaque dolor odit sunt! Nostrum dignissimos repellendus rem.
              Ipsum distinctio voluptatum adipisci odit iste architecto. Soluta
              id ullam minima, nihil repellendus facere. Dicta, atque quos
              consequatur tempore eaque illum ipsum voluptatum laborum, aliquam
              impedit voluptas officiis laboriosam tempora blanditiis,
              exercitationem eligendi repellendus. At rem eius excepturi
              distinctio, assumenda atque aliquid, mollitia aut dolore possimus
              ullam? Quod tempora voluptates, commodi fugiat porro harum sunt
              quia quidem quo iusto a qui tenetur vel mollitia cupiditate
              magnam, iste consequatur magni excepturi beatae eaque rerum
              incidunt eligendi. Repellat temporibus, optio nam, laboriosam,
              similique laudantium itaque blanditiis dolore rerum quia qui amet
              quidem. Similique natus, cumque fugiat accusamus officiis at nihil
              ea quae aliquam molestias ipsum saepe minus sapiente ullam alias
              aut! Delectus, fugiat! Voluptas assumenda officia accusamus dolore
              repellat. Facilis, tempore corrupti. Cupiditate totam eius
              deserunt. Necessitatibus aspernatur quidem, quia neque rerum sint.
              Accusamus, sint fuga veniam molestias hic saepe eos, magnam
              reiciendis ut porro eveniet recusandae perferendis alias explicabo
              est suscipit. Ad eius consectetur quidem dicta labore impedit
              iusto debitis nam iure numquam nisi totam at deleniti, quisquam et
              error minima laboriosam delectus?
            </h1>
          </div>
        </div>
        <div className="bg-yellow-300 w-[calc(100%-25rem)] relative">
          <div className="h-[4rem] bg-pink-300">
            <h1>left navbar</h1>
          </div>
          <div className="h-[calc(100%-8rem)] overflow-y-auto">
            <div>
              <p>Chats</p>
            </div>
          </div>
          <Send_Message_Input message={message} setMessage={setMessage} />
        </div>
      </main>
    </Auth_Layout>
  );
};

export default Chat;
