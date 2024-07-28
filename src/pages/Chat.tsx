import React, { useEffect, useState } from "react";
// import { GroupsIcon } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import {
  Groups,
  PlayCircleOutline,
  MoreVert,
  Album,
  AddBox,
} from "@mui/icons-material";
import Send_Message_Input from "@/components/normal/Send_Message_Input";
import Auth_Layout from "@/components/normal/Auth_Layout";
const Chat = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  return (
    <Auth_Layout>
      <main className="flex h-screen relative">
        <div className="w-[25rem]">
          <div>
            <div className="h-[4rem] flex items-center justify-between px-2">
              <div className="basis-[30%]">
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
                  alt="profilePic"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>

              <div className="flex justify-evenly basis-[70%] text-gray-600">
                <Album
                  fontSize="large"
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
                <Drawer open={open} onClose={() => setOpen(false)}>
                  <div className="w-[25rem]">
                    <h1>Drawer</h1>
                  </div>
                </Drawer>
                <Groups fontSize="large" className="cursor-pointer" />
                <AddBox fontSize="large" className="cursor-pointer" />
                <MoreVert fontSize="large" className="cursor-pointer" />
              </div>
            </div>
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
            {/* <h1>All Chats</h1> */}
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
              modi, numquam at, ducimus omnis quod laborum reprehenderit
              perspiciatis cupiditate expedita ipsum impedit distinctio
              doloribus, exercitationem a alias cumque. Dolor, ut mollitia
              dolorem facere possimus doloribus quis ab ipsa dignissimos in
              temporibus aut provident? Alias adipisci quasi eum sit quia
              molestiae quas ex, ipsum est recusandae debitis ducimus
              consectetur dicta quo reiciendis cum aliquid ipsam? Facere
              adipisci unde, omnis ratione dolore temporibus neque magni, quos,
              aliquid exercitationem illum quo nemo quasi ullam ab? Mollitia eos
              ducimus rerum aliquid voluptatum, numquam quam optio tenetur
              laborum, sit, rem voluptatem similique sapiente! Quisquam sit
              natus tenetur cumque temporibus maxime ratione nam laboriosam
              provident, velit quasi aspernatur praesentium accusamus nostrum
              commodi doloremque tempore explicabo quaerat! Hic unde dolores
              eaque id repellendus delectus! Nisi, ad quas! Impedit dolor,
              mollitia voluptatum ipsum corporis aliquid ratione veniam quaerat
              blanditiis animi velit suscipit praesentium delectus, omnis aut,
              ab odio id doloribus quis cumque tenetur iure amet? Ex, cumque.
              Blanditiis aspernatur repudiandae optio voluptatibus tempore eos
              totam eaque hic atque saepe, neque officiis laborum laudantium
              ipsam unde perspiciatis. Tempore voluptatibus autem deleniti
              laborum nobis quisquam quos eum, blanditiis atque praesentium
              pariatur minima nisi harum minus fugiat commodi ullam! Officia
              temporibus mollitia velit saepe nobis earum in ipsum quaerat!
              Suscipit id, perspiciatis illum quibusdam quis asperiores
              delectus, nihil eius ad veniam sunt nesciunt eum inventore
              doloremque, alias laudantium magni quasi beatae nemo porro iure
              ipsa eaque. Nihil veniam aliquam illo perspiciatis vitae
              reprehenderit vel reiciendis cum, atque repellendus architecto
              molestias enim exercitationem esse nisi quas ipsa, ullam ab
              dolorum tempora qui omnis perferendis. Sed tempore magni, amet,
              cupiditate assumenda suscipit expedita similique totam
              exercitationem, ea aliquid dolores. Fugit magnam dicta, aut
              exercitationem sunt iure dolorem quos nesciunt vel quidem nostrum
              necessitatibus. Ab officiis dolorum nam dolores. Illo harum eius
              consequuntur sapiente, doloremque sunt ab deleniti aliquam unde et
              minima deserunt impedit consectetur esse provident accusamus earum
              hic explicabo magnam eaque dicta distinctio voluptas a. Ducimus
              delectus eaque quod. Commodi numquam quisquam illo mollitia
              blanditiis quas necessitatibus, ipsa doloribus, magnam veniam
              soluta consectetur, rem aperiam vero! Repellendus, est molestias.
              Et in quis enim, eaque incidunt aut neque consequuntur. Esse velit
              corporis aliquid delectus ipsum, ipsa quam dicta ab. Est quibusdam
              sed similique sit necessitatibus dolores? In earum consectetur sit
              quo provident ab perspiciatis nihil, cum vel, non libero,
              temporibus numquam? Quaerat ea necessitatibus nemo recusandae
              voluptates minus aspernatur quas adipisci in. Omnis explicabo
              alias, delectus reiciendis fugit nihil autem tenetur excepturi
              magnam, odio non possimus dolorum ut! Veniam officia vitae maiores
              nesciunt excepturi ipsam repudiandae omnis fugit est qui veritatis
              voluptate magnam necessitatibus in aperiam quibusdam deserunt
              doloribus fugiat unde, eos molestiae assumenda odio, explicabo
              consequatur. Assumenda sapiente corrupti asperiores adipisci autem
              minus qui vel, necessitatibus ut tempore atque. Ex praesentium cum
              alias suscipit? Aperiam velit aspernatur illum. Numquam explicabo
              inventore repellat, ipsa facere sequi perferendis eum tempore
              provident? Perferendis minima inventore ipsa maiores veritatis
              soluta quod cupiditate error nihil eos, sunt, distinctio atque!
              Debitis at corrupti saepe maxime eveniet aut, hic quo aperiam
              esse. Mollitia consequuntur quibusdam dignissimos facere quasi
              dolorem magni dolore iure sint labore aliquid odit quo, ut minima
              dolores optio esse nesciunt, est quae nam explicabo. Illo ab
              voluptatem praesentium fugit maxime voluptas dignissimos libero
              assumenda? Velit at, illum ducimus ipsa nulla error fugiat
              accusantium autem optio corrupti earum itaque quis quam corporis
              iure distinctio voluptatibus laudantium iste tenetur ullam quia
              veritatis? Quisquam, dolor nihil ipsum aspernatur ab suscipit
              assumenda non sequi repudiandae cupiditate quo! Neque aut, ex
              blanditiis at corrupti atque error? Libero laboriosam, laborum,
              ipsa nam nulla ducimus doloremque corrupti asperiores nobis
              repudiandae hic doloribus aut quibusdam recusandae tempora iusto
              consectetur tenetur! Quaerat molestias vel illum fugit explicabo
              ex possimus pariatur soluta a, expedita corrupti assumenda quod
              non recusandae ipsa rem enim quasi aliquid totam accusantium
              cupiditate dicta quo! Animi culpa harum quasi consequatur cum
              nulla mollitia quibusdam voluptates minima est quas cupiditate
              magnam a atque excepturi voluptatibus, vel at repudiandae sed
              recusandae rerum dolore aspernatur ullam? Laudantium, sit dolor.
              Harum tempora alias accusamus quam illum necessitatibus iste,
              voluptatum pariatur nam officia optio atque maiores cumque fugiat
              quaerat at quia, beatae voluptatem quasi possimus consectetur
              tempore assumenda aut. Aspernatur corrupti voluptates molestias
              debitis vero ipsa soluta rem quaerat esse iure? Labore eos non,
              assumenda eius itaque, culpa placeat consectetur eveniet ullam
              quae nesciunt soluta saepe laborum enim velit quibusdam quis natus
              dolorem dicta sit aut veritatis repellat fugit accusamus?
              Doloremque odio, accusamus cumque eos alias perferendis enim
              obcaecati molestiae suscipit facere laudantium nisi quos veniam!
              Laborum iure porro odio pariatur nulla, nihil fugiat libero
              aliquam cum, ullam reiciendis accusamus totam dignissimos autem
              praesentium in magnam ex cupiditate modi tempore culpa rem
              numquam? Optio, accusamus ab? Labore neque hic non inventore
              laboriosam provident culpa, libero consequatur dolore, eveniet
              laborum dolorum illo sed? Dolore eos magni dolores minima
              aspernatur odit voluptatem amet nam, voluptates non alias dolorem
              culpa error nostrum! Atque ut enim ipsa nemo dolore laudantium
              repellat rerum ipsam accusamus assumenda laborum, sapiente
              cupiditate ipsum, vitae veniam blanditiis? Eveniet, aliquam
              voluptas aliquid quos dolore repudiandae culpa minima natus nam
              nulla ratione delectus, quo, quidem qui quas? Nemo distinctio
              dolor unde ipsum veritatis quidem repellat qui. Nesciunt iusto
              iste minus facere unde, nulla magni aut minima quae nisi ea magnam
              reprehenderit assumenda quidem deleniti eum accusamus maiores
              delectus voluptatum ex rem laborum optio laudantium quibusdam.
              Dicta, odio rerum dolorem obcaecati, molestias ducimus nisi veniam
              voluptas consectetur sequi libero sed mollitia accusantium iusto
              ullam. A distinctio saepe doloremque fugit ipsa ipsum aperiam
              tempora nostrum consequatur sequi earum fuga deleniti accusamus
              labore, consectetur quas, quae voluptas eveniet omnis? Voluptates,
              at illum? Sapiente dolorum animi, sint eos dolorem corrupti at
              dolore iste ab voluptas autem quibusdam repudiandae ad obcaecati
              voluptatem quidem cupiditate sit omnis alias officiis consequuntur
              dignissimos. Sit architecto nesciunt sed et harum, vero obcaecati
              laborum reiciendis aliquam ipsa repudiandae aperiam natus
              repellat. Vel commodi harum officiis quidem dolorum placeat
              recusandae nihil. Consectetur cumque sint dolorum, modi id nihil
              fuga accusamus reiciendis, at, minus animi quasi odio labore
              deserunt eaque.
            </p>
          </div>
          <Send_Message_Input message={message} setMessage={setMessage} />
        </div>
      </main>
    </Auth_Layout>
  );
};

export default Chat;
