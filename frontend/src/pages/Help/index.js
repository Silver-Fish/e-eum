import React from 'react';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
// import ButtonComp from '../../components/ButtonComp/ButtonComp';
import styles from './index.module.css'

const Help = () => {
    return(
        <div className={styles.help_box}>
          <HeaderComp headertitle='도움말'></HeaderComp>
          <div className={styles.feature_box}>
          <p className={styles.subtitle}>일반</p>
          <ul className={styles.qna}>
            <li>
                <input type="checkbox" id="common-1"/>
                <label for="common-1">이음을 탈퇴하고 싶어요.</label>
                <div>
                    <p>아래 경로를 통해 회원 탈퇴를 직접 진행하실 수 있습니다.</p>
                    <p>우측 상단의 버튼(☰)> 마이 페이지> 회원 탈퇴</p>
                </div>
            </li>
          </ul>
          <p className={styles.subtitle}>나만의 이음 (카드)</p>
          <ul className={styles.qna}>
            <li>
                <input type="checkbox" id="card-1"/>
                <label for="card-1">나만의 카드를 어떻게 추가하나요?</label>
                <div>
                    <p>나만의 이음 페이지 좌측 하단의 [추가] 버튼을 누른 후 나오는 페이지에서 카드를 추가할 수 있으며,</p>
                    <p>페이지의 카메라 버튼을 눌러 사진을 첨부할 수 있습니다.</p>
                </div>
            </li>
            <li>
                <input type="checkbox" id="card-2"/>
                <label for="card-2">나만의 카드를 어떻게 수정, 삭제하나요?</label>
                <div>
                    <p>1. 수정</p>
                    <p>나만의 이음 페이지 우측 하단의 [수정] 버튼을 누른 후 수정하고 싶은 카드를 누르면 나오는 페이지에서 카드의 이름을 수정할 수 있습니다.</p>
                    <p>2. 삭제</p>
                    <p>나만의 이음 페이지 우측 하단의 [수정] 버튼을 누른 후 삭제하고 싶은 카드의 오른쪽 위에 있는 빨간색 (-) 아이콘을 누르면 삭제할 수 있습니다.</p>
                </div>
            </li>
            <li>
                <input type="checkbox" id="card-3"/>
                <label for="card-3">선택한 카드의 음성을 한번에 재생할 수 있나요?</label>
                <div>
                    <p>나만의 이음 페이지 상단에 보이는 ...</p>
                </div>
            </li>
        </ul>
          <p className={styles.subtitle}>상황별 이음 (카테고리)</p>
          <ul className={styles.qna}>
            <li>
                <input type="checkbox" id="category-1"/>
                <label for="category-1">여러 카테고리에 있는 카드를 동시에 사용할 수 있나요?</label>
                <div>
                    <p></p>
                </div>
            </li>
            <li>
                <input type="checkbox" id="category-2"/>
                <label for="category-2">나만의 카테고리를 어떻게 추가하나요?</label>
                <div>
                    <p></p>
                </div>
            </li>
            <li>
                <input type="checkbox" id="category-3"/>
                <label for="category-3">나만의 카테고리를 어떻게 수정, 삭제하나요?</label>
                <div>
                    <p></p>
                </div>
            </li>
        </ul>
          <p className={styles.subtitle}>QR로 이음</p>
          <ul className={styles.qna}>
            <li>
                <input type="checkbox" id="qr-1"/>
                <label for="qr-1">내가 원하는 카드만 상대방에게 보여줄 수 있나요?</label>
                <div>
                    <p>'QR로 이음' 기능을 통해 가능합니다.</p>
                    <p>QR 등록 후 ...</p>
                </div>
            </li>
        </ul>
          </div>
        </div>
    )
}

export default Help